using System;
using UnityEngine;
using static EnemyStat;

[Serializable]
public class Stat
{
    [SerializeField]
    private float _basevalue;
    [SerializeField]
    private float _additiveModifier;
    [SerializeField]
    private float _multiplicativeModifier;
    [SerializeField]
    private float _currentvalue;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public float basevalue
    {
        get
        {
            return _basevalue;
        }
        set
        {
            _basevalue = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float value
    {
        get
        {
            _currentvalue = basevalue * AdditiveModifier * MultiplicativeModifier;
            return _currentvalue;
        }
        set
        {
            _currentvalue = value;
        }
    }
    [SerializeField]
    public float AdditiveModifier
    {
        get
        {
            return _additiveModifier;
        }
        set
        {
            _additiveModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float MultiplicativeModifier
    {
        get
        {
            return _multiplicativeModifier;
        }
        set
        {
            _multiplicativeModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    public enum StatType
    {
        damage,
        attackSpeed,
        health,
        armor,
        evasion,
        regen,
    }
    [SerializeField]
    public StatType statType;
    public Stat(StatType type, float baseValue, float additiveModifier, float multiplicativeModifier)
    {
        statType = type;
        basevalue = baseValue;
        AdditiveModifier = additiveModifier;
        MultiplicativeModifier = multiplicativeModifier;
    }

    private void updateStatValue()
    {
        //Debug.Log($"new value: {value}");
        value = basevalue * AdditiveModifier * MultiplicativeModifier;
    }

    public void SaveStat()
    {
        ES3.Save("Stats/prestige1_temp/Stat_" + statType.ToString() + "_value", basevalue);
        ES3.Save("Stats/prestige1_temp/Stat_" + statType.ToString() + "_additiveModifier", AdditiveModifier);
        ES3.Save("Stats/prestige1_temp/Stat_" + statType.ToString() + "_multiplicativeModifier", MultiplicativeModifier);
    }
    public void LoadStat(BaseStats baseStats)
    {
        if (ES3.KeyExists("Stats/prestige1_temp/Stat_" + statType.ToString() + "_value"))
        {
            basevalue = ES3.Load<float>("Stats/prestige1_temp/Stat_" + statType.ToString() + "_value");
            AdditiveModifier = ES3.Load<float>("Stats/prestige1_temp/Stat_" + statType.ToString() + "_additiveModifier");
            MultiplicativeModifier = ES3.Load<float>("Stats/prestige1_temp/Stat_" + statType.ToString() + "_multiplicativeModifier");
        }
        else
        {
            foreach (Stat basestat in baseStats.stats)
            {
                if (basestat.statType == statType)
                {
                    basevalue = basestat.basevalue;
                    AdditiveModifier = basestat.AdditiveModifier;
                    MultiplicativeModifier = basestat.MultiplicativeModifier;
                    break;
                }
            }

        }
    }
}

[Serializable]
public class SecondaryStat 
{
    [SerializeField] private float _basevalue;
    [SerializeField] private float _additiveModifier = 1;
    [SerializeField] private float _mulitplicativeModifier = 1;
    [SerializeField] private float _currentvalue;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public float basevalue
    {
        get
        {
            return _basevalue;
        }
        set
        {
            _basevalue = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float value
    {
        get
        {
            _currentvalue = basevalue * AdditiveModifier;
            return _currentvalue;
        }
        set
        {
            _currentvalue = value;
        }
    }
    [SerializeField]
    public float AdditiveModifier
    {
        get
        {
            return _additiveModifier;
        }
        set
        {
            _additiveModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    public float MultiplicativeModifier
    {
        get
        {
            return _mulitplicativeModifier;
        }
        set
        {
            _mulitplicativeModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    private void updateStatValue()
    {
        //Debug.Log($"new value: {value}");
        value = basevalue * AdditiveModifier * MultiplicativeModifier;
    }
    public enum SecondaryStatType //for some super odd reason scripts are skipping the first stat, hence its name
    {
        fillerstat,
        regenSpeed,
        maxRegenStacks,
        damageResistance,
        chanceforDoubleGold
    }

    public SecondaryStatType secondaryStatType;

    public SecondaryStat() { }
    public SecondaryStat(SecondaryStatType type, float BaseValue, float additiveModifier, float multiplicativeModifier)
    {
        secondaryStatType = type;
        basevalue = BaseValue;
        AdditiveModifier = additiveModifier;
        MultiplicativeModifier = multiplicativeModifier;
    }

    public void SaveStat()
    {
        ES3.Save("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() +"_value", basevalue);
        ES3.Save("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() + "_additiveModifier", AdditiveModifier);
        ES3.Save("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() + "_multiplicativeModifier", MultiplicativeModifier);
    }

    public void LoadStat(BaseStats baseStats)
    {
        if (ES3.KeyExists("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() +"_value"))
        {
            basevalue = ES3.Load<float>("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() +"_value");
            AdditiveModifier = ES3.Load<float>("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() + "_additiveModifier");
            MultiplicativeModifier = ES3.Load<float>("SecondaryStat/prestige1_temp/Stat_" + secondaryStatType.ToString() + "_multiplicativeModifier");
        }
        else
        {
            foreach (SecondaryStat basestat in baseStats.secondaryStats)
            {
                if (basestat.secondaryStatType == secondaryStatType)
                {
                    basevalue = basestat.basevalue;
                    AdditiveModifier = basestat.AdditiveModifier;
                    MultiplicativeModifier = basestat.MultiplicativeModifier;
                    break;
                }
            }
        }

    }
}


[Serializable]
public class ClassStat
{
    [SerializeField] private float _basevalue;
    [SerializeField] private float _additiveModifier = 1;
    [SerializeField] private float _multiplicativeModifier = 1;
    [SerializeField] private float _currentvalue;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public float basevalue
    {
        get
        {
            return _basevalue;
        }
        set
        {
            _basevalue = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float value
    {
        get
        {
            _currentvalue = basevalue * AdditiveModifier * MultiplicativeModifier;
            return _currentvalue;
        }
        set
        {
            _currentvalue = value;
        }
    }
    [SerializeField]
    public float AdditiveModifier
    {
        get
        {
            return _additiveModifier;
        }
        set
        {
            _additiveModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float MultiplicativeModifier
    {
        get
        {
            return _multiplicativeModifier;
        }
        set
        {
            _multiplicativeModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    private void updateStatValue()
    {
        //Debug.Log($"new value: {value}");
        value = basevalue * AdditiveModifier * MultiplicativeModifier;
    }
    public enum ClassStatTypes
    {
        instakillChance,
        instakillChanceThreshold,
        poisonDuration,
        poisonChance,
        poisonSpeed,
        poisonDamage,
        maxPoisonStack,
        mainAttackAOE,
        sawCooldown,
        sawDuration,
        sawDamage,
        sawSpeed,
        rageMeterHitNeeded,
        damageResistanceOnBiggerSize,
        shadowRealmCooldown,
        shadowRealmATKSPD,
        shadowRealmRegen,
        shadowRealmEvasion,
        poisonSpread,
        armorAsLife,
        damageOnBiggerSize,
        biggerWhileSawing
    }

    public ClassStatTypes classStatType;

    public ClassStat() { }
    public ClassStat(ClassStatTypes type, float BaseValue, float additiveModifier, float multiplicativeModifier)
    {
        classStatType = type;
        basevalue = BaseValue;
        AdditiveModifier = additiveModifier;
        MultiplicativeModifier = multiplicativeModifier;
    }

    public void SaveStat()
    {
        ES3.Save("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_value", basevalue);
        ES3.Save("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_additiveModifier", AdditiveModifier);
        ES3.Save("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_multiplicativeModifier", MultiplicativeModifier);
    }

    public void LoadStat(BaseStats baseStats)
    {
        if (ES3.KeyExists("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_value"))
        {
            basevalue = ES3.Load<float>("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_value");
            AdditiveModifier = ES3.Load<float>("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_additiveModifier");
            MultiplicativeModifier = ES3.Load<float>("ClassStat/prestige1_temp/Stat_" + classStatType.ToString() + "_multiplicativeModifier");
        }
        else
        {
            foreach (ClassStat basestat in baseStats.rogueClassStats)
            {
                if (basestat.classStatType == classStatType)
                {
                    basevalue = basestat.basevalue;
                    AdditiveModifier = basestat.AdditiveModifier;
                    MultiplicativeModifier= basestat.MultiplicativeModifier;
                    break;
                }
            }
            foreach (ClassStat basestat in baseStats.warriorClassStats)
            {
                if (basestat.classStatType == classStatType)
                {
                    basevalue = basestat.basevalue;
                    AdditiveModifier = basestat.AdditiveModifier;
                    MultiplicativeModifier = basestat.MultiplicativeModifier;
                    break;
                }
            }
        }
    }
}
[Serializable]
public class PrestigeStat
{
    [SerializeField]
    private float _basevalue;
    [SerializeField]
    private float _additiveModifier;
    [SerializeField]
    private float _multiplicativeModifier;
    [SerializeField]
    private float _currentvalue;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public float basevalue
    {
        get
        {
            return _basevalue;
        }
        set
        {
            _basevalue = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float value
    {
        get
        {
            _currentvalue = basevalue * AdditiveModifier * MultiplicativeModifier;
            return _currentvalue;
        }
        set
        {
            _currentvalue = value;
        }
    }
    [SerializeField]
    public float AdditiveModifier
    {
        get
        {
            return _additiveModifier;
        }
        set
        {
            _additiveModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float MultiplicativeModifier
    {
        get
        {
            return _multiplicativeModifier;
        }
        set
        {
            _multiplicativeModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    public enum PrestigeStatType
    {
        XP,
        extraDamage,
        extraHealth
    }
    [SerializeField]
    public PrestigeStatType prestigeStatType;
    public PrestigeStat(PrestigeStatType type, float baseValue, float additiveModifier, float multiplicativeModifier)
    {
        prestigeStatType = type;
        basevalue = baseValue;
        AdditiveModifier = additiveModifier;
        MultiplicativeModifier = multiplicativeModifier;
    }

    private void updateStatValue()
    {
        //Debug.Log($"new value: {value}");
        value = basevalue * AdditiveModifier * MultiplicativeModifier;
    }

    public void SaveStat()
    {
        ES3.Save("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_value", basevalue);
        ES3.Save("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_additiveModifier", AdditiveModifier);
        ES3.Save("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_multiplicativeModifier", MultiplicativeModifier);
    }
    public void LoadStat()
    {
        if (ES3.KeyExists("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_value"))
        {
            basevalue = ES3.Load<float>("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_value");
            AdditiveModifier = ES3.Load<float>("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_additiveModifier");
            MultiplicativeModifier = ES3.Load<float>("Stats/prestige2_temp/PrestigeStat_" + prestigeStatType.ToString() + "_multiplicativeModifier");
        }
    }
}

[Serializable]
public class ClassConditionStat
{
    [SerializeField] private bool _value;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public bool Value
    {
        get
        {
            return _value;
        }
        set
        {
            _value = value;
            OnStatChanged?.Invoke();
        }
    }
  
    public enum ClassConditionStatTypes
    {
        CalmBeforeTheStorm,
        PoisonAffectedInstakill,
        ShadowTime
    }

    public ClassConditionStatTypes classConditionStatType;

    public ClassConditionStat() { }
    public ClassConditionStat(ClassConditionStatTypes type, bool value)
    {
        classConditionStatType = type;
        Value = value;
    }

    public void SaveStat()
    {
        ES3.Save("ClassConditionStat/prestige1_temp/Stat_" + classConditionStatType.ToString() + "_value", Value);
    }

    public void LoadStat(BaseStats baseStats)
    {
        if (ES3.KeyExists("ClassStat/prestige1_temp/Stat_" + classConditionStatType.ToString() + "_value"))
        {
            Value = ES3.Load<bool>("ClassStat/prestige1_temp/Stat_" + classConditionStatType.ToString() + "_value");
        }
        else
        {
            foreach (ClassConditionStat basestat in baseStats.rogueConditionStats)
            {
                if (basestat.classConditionStatType == classConditionStatType)
                {
                    Value = basestat.Value;
                    break;
                }
            }
            foreach (ClassConditionStat basestat in baseStats.warriorConditionStats)
            {
                if (basestat.classConditionStatType == classConditionStatType)
                {
                    Value = basestat.Value;
                    break;
                }
            }
        }
    }
}

[Serializable]
public class EnemyStat
{
    [SerializeField] private float _basevalue;
    [SerializeField] private float _additiveModifier = 1;
    [SerializeField] private float _multiplicativeModifier = 1;
    [SerializeField] private float _currentvalue;

    public delegate void StatAction();
    public static StatAction OnStatChanged;

    [SerializeField]
    public float basevalue
    {
        get
        {
            return _basevalue;
        }
        set
        {
            _basevalue = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float value
    {
        get
        {
            _currentvalue = basevalue * AdditiveModifier * MultiplicativeModifier;
            return _currentvalue;
        }
        set
        {
            _currentvalue = value;
        }
    }
    [SerializeField]
    public float AdditiveModifier
    {
        get
        {
            return _additiveModifier;
        }
        set
        {
            _additiveModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    [SerializeField]
    public float MultiplicativeModifier
    {
        get
        {
            return _multiplicativeModifier;
        }
        set
        {
            _multiplicativeModifier = value;
            updateStatValue();
            OnStatChanged?.Invoke();
        }
    }
    private void updateStatValue()
    {
        //Debug.Log($"new value: {value}");
        value = basevalue * AdditiveModifier * MultiplicativeModifier;
    }
    public enum EnemyStatTypes
    {
        scaleModifier,
        enemySpeed,
        spawnSpeed,
        spawnQuantity,
        chanceForDoubleCoins,
        coinsModifier,
        lifeModifier,
        damageModifier,
        commonAffixChance,
        rareAffixChance,
        legendaryAffixChance
    }

    public EnemyStatTypes enemyStatType;

    public EnemyStat() { }
    public EnemyStat(EnemyStatTypes type, float BaseValue, float additiveModifier, float multiplicativeModifier)
    {
        enemyStatType = type;
        basevalue = BaseValue;
        AdditiveModifier = additiveModifier;
        MultiplicativeModifier = multiplicativeModifier;
    }

    public void SaveStat()
    {
        ES3.Save("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_value", basevalue);
        ES3.Save("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_additiveModifier", AdditiveModifier);
        ES3.Save("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_multiplicativeModifier", MultiplicativeModifier);
    }

    public void LoadStat(BaseStats baseStats)
    {
        if (ES3.KeyExists("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_value"))
        {
            basevalue = ES3.Load<float>("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_value");
            AdditiveModifier = ES3.Load<float>("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_additiveModifier");
            MultiplicativeModifier = ES3.Load<float>("EnemyStat/prestige1_temp/Stat_" + enemyStatType.ToString() + "_multiplicativeModifier");
        }
        else
        {
            foreach (EnemyStat basestat in baseStats.enemyStats)
            {
                if (basestat.enemyStatType == enemyStatType)
                {
                    basevalue = basestat.basevalue;
                    AdditiveModifier = basestat.AdditiveModifier;
                    MultiplicativeModifier = basestat.MultiplicativeModifier;
                    break;
                }
            }
        }
    }
}