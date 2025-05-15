using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using UnityEngine.Rendering;
using UnityEngine.Events;
using MoreMountains.Feedbacks;
using PrimeTween;

public class EnnemyStatus : MonoBehaviour
{
    public enum MovementBehaviour
    {
        Basic, //Implemented
        Bouncing,//Implemented
        Egg, //Implemented
        PositionToReach, //Not implemented
        Boss
    }
    public MovementBehaviour movementBehaviour;

    public enum ExtraBehaviour
    {
        Dashing,
        Merging, 
        Splitting,
        Shooting,
        HealingAOE,
        HealingBullet,
        ContactDamage,
        CallEnnemy,
        StopsCursor
    }

    public List<ExtraBehaviour> extraBehaviours;

    public float maxHealth = 3f;
    public float currentHealth { get; private set; }
    public float damage = 0.5f;
    public float speed = 1f;

    public GameObject ressourcePrefab;
    public RessourceManager.RessourceType[] ressourceTypes;
    public float[] ressourceQuantities;

    public UnityEvent OnDie;
    public UnityEvent OnGetAttacked;

    [SerializeField] public Dictionary<RessourceManager.RessourceType, float> ressourcesDropped = new Dictionary<RessourceManager.RessourceType, float>();
    [SerializeField] public LayerMask allyLayerMask;
    private ZoneManager zoneManager;
    [SerializeField] GameObject InstakillEffect;

    public List<Effects.StatusEffect> statusEffects = new List<Effects.StatusEffect>();

    private PlayerStats playerStats;
    private bool isKnockbacking = false;
    private void Start()
    {
        playerStats = PlayerStats.Instance;
        zoneManager = FindObjectOfType<ZoneManager>();
        InitializeStats();
    }

    private void InitializeStats()
    {
        AddBehaviour();

        GetComponent<MovementEnnemyBehaviour>().speed = speed;
        maxHealth *= zoneManager.scaleCoeefficient;
        damage *= 1 + ((zoneManager.scaleCoeefficient - 1) / 3);
        for (int i = 0; i < ressourceQuantities.Count(); i++)
        {
            ressourceQuantities[i] *= 1 + ((zoneManager.scaleCoeefficient - 1) / 3);
        }
        for (int i = 0; i < ressourceTypes.Length; i++)
        {
            ressourcesDropped.Add(ressourceTypes[i], (float)Utils.GetIntFromFloat(ressourceQuantities[i]));
        }
        currentHealth = maxHealth;
    }

    private void AddBehaviour()
    {
        if (gameObject.GetComponent<MovementEnnemyBehaviour>() == null)
        {
            switch (movementBehaviour)
            {
                case MovementBehaviour.Basic:
                    gameObject.AddComponent<BasicEnnemyBehaviour>();
                    break;

                case MovementBehaviour.Egg:
                    gameObject.AddComponent<EggBornBehaviour>(); 
                    break;

                case MovementBehaviour.Boss:
                    gameObject.AddComponent<BossEnnemyBehaviour>();
                    break;

                default:
                    break;
            }
        }
        if (gameObject.GetComponent<ExtraBehaviourClass>() == null)
        {
            foreach (ExtraBehaviour behaviour in extraBehaviours)
            {
                switch (behaviour)
                {
                    case ExtraBehaviour.Dashing:
                        gameObject.AddComponent<DashingBehaviour>();
                        break;

                    case ExtraBehaviour.Splitting:
                        gameObject.AddComponent<SplittingBehaviour>();
                        break;

                    case ExtraBehaviour.Merging:
                        gameObject.AddComponent<MergingBehaviour>();
                        break;
                    case ExtraBehaviour.Shooting:
                        gameObject.AddComponent<ShootingBehaviour>();
                        break;
                    case ExtraBehaviour.HealingAOE:
                        gameObject.AddComponent<HealingAOEBehaviour>();
                        break;
                    case ExtraBehaviour.HealingBullet:
                        gameObject.AddComponent<HealingShootingBehaviour>();
                        break;
                    case ExtraBehaviour.ContactDamage:
                        gameObject.AddComponent<ContactDamageBehaviour>();
                        break;
                    case ExtraBehaviour.CallEnnemy:
                        gameObject.AddComponent<CallsEnnemyBehaviour>();
                        break;
                    case ExtraBehaviour.StopsCursor:
                        gameObject.AddComponent<CursorBlockerBehaviour>();
                        break;
                    default:
                        break;

                }
            }
        }
    }

    public IEnumerator TakeDOT(float duration, float damage, float speed, bool hasTint = false, Color? tintColor = null)
    {
	    Color baseColor = new Color(0,0,0);
	    float timer = 0;
	    float timePerDOT = 1/speed;
        Image[] images = transform.GetComponentsInChildren<Image>();

        if (hasTint)
	    {
	        Color nonNullTintColor = tintColor ?? Color.white;

            foreach(Image image in images)
            {
                baseColor = image.color;
                image.GetComponentInChildren<Image>().color = Color.Lerp(baseColor, nonNullTintColor, 0.25f);
                image.SetMaterialDirty();
            }

        }

	    while(timer < duration)
        {
            yield return new WaitForSeconds(timePerDOT);
            TakeDamage(damage, Health.DamageSource.poison);
            if (playerStats.InstakillChance.value > 0 && currentHealth <= (maxHealth * playerStats.InstakillChanceThreshold.value / 100) && UnityEngine.Random.Range(0, 101) < playerStats.InstakillChance.value && currentHealth > 0)
            {
                Debug.Log("Instakilled at " + currentHealth / maxHealth * 100 + "% HP");

                TakeDamage(maxHealth, Health.DamageSource.regular);
                GameObject effect = Instantiate(InstakillEffect, transform.position, Quaternion.identity);
                effect.GetComponent<MMF_Player>().PlayFeedbacks();
            }
            timer += timePerDOT;
	    }
        if (hasTint)
        {
            foreach (Image image in images)
            {
                image.GetComponentInChildren<Image>().color = baseColor;
            }
        }

        statusEffects.Remove(Effects.StatusEffect.Poisoned);
    }

    public void TakeDamage(float damage, Health.DamageSource type)
    {
        currentHealth -= damage;
        currentHealth = Mathf.Clamp(currentHealth, 0, maxHealth);
        OnGetAttacked.Invoke();

        Image[] images = transform.GetComponentsInChildren<Image>();
        foreach (Image image in images)
        {
            Tween.UIFillAmount(image, currentHealth / maxHealth, 0.2f);
        }

        if (currentHealth == 0 )
        {
            switch (type)
            {
                case Health.DamageSource.poison:
                    DeathByPoison();
                    break;

                default:
                    onDeath();
                    break;
            }
        }
    }

    public void TakeKnockback(float knockbackStrength = 1, float knockbackDuration = 0.5f)
    {
        if (isKnockbacking) { return; }
        StartCoroutine(knockbacking(GetComponent<BasicEnnemyBehaviour>(), knockbackStrength, knockbackDuration));
    }

    private void DeathByPoison()
    {
        if (playerStats.poisonSpread.value <= 0)
        {
            onDeath();
            return; }

        for (int i = 0; i < Utils.GetIntFromFloat(playerStats.poisonSpread.value); i++)
        {
            Debug.Log("Looking for ennemies");

            Collider2D[] hitColliders = Physics2D.OverlapCircleAll(transform.position, 15f, allyLayerMask);

            if (hitColliders.Length == 0)
            {
                Debug.Log("Found none");

                onDeath(); return;
            }

            float closestDistance = float.MaxValue;
            int closestIndex = -1; // Invalid index means no valid target found yet

            for (int j = 0; j < hitColliders.Length; j++)
            {
                // Skip null colliders or missing gameobjects
                if (hitColliders[j] == null || hitColliders[j].gameObject == null)
                    continue;

                EnnemyStatus enemyStatus = hitColliders[j].GetComponent<EnnemyStatus>();
                if (enemyStatus == null)
                    continue;

                // Skip allies already at poison cap
                if (enemyStatus.statusEffects.Count(item => item.Equals(Effects.StatusEffect.Poisoned)) >= playerStats.MaxPoisonStack.value)
                {
                    continue;
                }


                float distance = Vector2.Distance(hitColliders[j].transform.position, transform.position);
                if (distance < closestDistance)
                {
                    closestDistance = distance;
                    closestIndex = j;
                    Debug.Log("Found one");

                }
            }
            if (closestIndex >= 0) // Only proceed if we found a valid target
            {
                EnnemyStatus status = hitColliders[closestIndex].GetComponent<EnnemyStatus>();
                status.statusEffects.Add(Effects.StatusEffect.Poisoned);
                status.StartCoroutine(status.TakeDOT(playerStats.PoisonDuration.value, (float)playerStats.PoisonDamage.value * playerStats.Damage.value / 100, playerStats.PoisonSpeed.value, true, new Color(0, 1f, 0)));
            }
            else
            {
                Debug.Log("No valid target found for poison spread");
            }
        }
        Debug.Log("should die");
        onDeath();
    }

    private IEnumerator knockbacking(BasicEnnemyBehaviour ennemyBehaviour, float knockbackStrength, float knockbackDuration)
    {
        isKnockbacking = true;
        float originalSpeed = ennemyBehaviour.speed;

        ennemyBehaviour.speed = -knockbackStrength;
        yield return new WaitForSeconds(knockbackDuration);

        ennemyBehaviour.speed = originalSpeed;
        isKnockbacking = false;
    }
    private void onDeath()
    {
        OnDie.Invoke();
        if(GetComponent<SplittingBehaviour>() != null) {return;}
        if(GetComponent<BossEnnemyBehaviour>() != null) { FindObjectOfType<ZoneManager>().OnBossKilled(); }
        else
        {
            FindObjectOfType<ZoneManager>().OnEnnemyKill();
        }
        int timesGoldGiven = 1;
        if(playerStats.chanceforDoubleGold.value > 0 )
        {
            timesGoldGiven += Utils.GetIntFromFloat(playerStats.chanceforDoubleGold.value/100);
        }
        for (int i = 0; i < timesGoldGiven; i++)
        {
            foreach (KeyValuePair<RessourceManager.RessourceType, float> kvp in ressourcesDropped)
            {
                if (kvp.Value < 5)
                {
                    for (int j = 0; j < kvp.Value; j++)
                    {
                        ressourcePrefab = Instantiate(ressourcePrefab, FindObjectOfType<ZoneManager>().transform);
                        ressourcePrefab.transform.position = transform.position;

                        DroppedRessourceScript script = ressourcePrefab.GetComponent<DroppedRessourceScript>();

                        script.value = 1;
                        script.type = kvp.Key;
                        script.Initialize();
                    }
                }
                else
                {
                    for (int j = 0; j < 5; j++)
                    {
                        ressourcePrefab = Instantiate(ressourcePrefab, FindObjectOfType<ZoneManager>().transform);
                        ressourcePrefab.transform.position = transform.position;
                        DroppedRessourceScript script = ressourcePrefab.GetComponent<DroppedRessourceScript>();

                        script.value = Utils.GetIntFromFloat(kvp.Value / 5);

                        script.type = kvp.Key;

                        script.Initialize();
                    }
                }
            }
        }
        

    }
}

