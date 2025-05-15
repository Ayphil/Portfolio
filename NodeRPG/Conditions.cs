using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UIElements;

public class Conditions : MonoBehaviour
{
    [SerializeField] public int ZoneCap = 2;
    public SerializedDictionary<string, bool> conditions = new SerializedDictionary<string, bool>();

    private void Awake()
    {
        InitializeConditions();
        LoadCondition();
    }

    private void OnEnable()
    {
        Health.onDeath += OnLevelEnd;
    }
    private void OnDisable()
    {
        Health.onDeath -= OnLevelEnd;
    }

    private void OnLevelEnd(Health.CauseOfDeath cause, Health.EndStage stage)
    {
        if(stage != Health.EndStage.Completion) { return; }
        PlayerManager playerManager = FindObjectOfType<PlayerManager>();
        if (cause != Health.CauseOfDeath.Finish) { return; }

        
        if (!ES3.KeyExists("conditions/prestige1_temp/Completed_zone_" + playerManager.zoneChosen.ZoneID + "_mission_" + playerManager.missionChosen.MissionID))
        {
            SaveCondition("conditions/prestige1_temp/Completed_zone_" + playerManager.zoneChosen.ZoneID + "_mission_" + playerManager.missionChosen.MissionID, true);
        }

        if (ES3.KeyExists("conditions/prestige1_temp/Completed_zone_"+ playerManager.zoneChosen.ZoneID + "_mission_" + playerManager.zoneChosen.maxMissionID) && playerManager.maxZoneProgress <= ZoneCap && playerManager.maxZoneProgress == playerManager.zoneChosen.ZoneID)
        {
            playerManager.maxZoneProgress++;
        }
    }

    public void SaveCondition(string conditionName, bool newValue)
    {
        conditions[conditionName] = newValue;
        ES3.Save(conditionName, newValue);
    }

    private void LoadCondition()
    {
        SerializedDictionary<string, bool> loadedConditions = new SerializedDictionary<string, bool>();
        foreach (var condition in conditions)
        {
            loadedConditions.Add(condition.Key,condition.Value);

            if (ES3.KeyExists(condition.Key))
            {
                loadedConditions[condition.Key] = ES3.Load<bool>(condition.Key);
            }
        }
            conditions = loadedConditions;
        
    }

    private void InitializeConditions() //only called once
    {
        conditions.Add("conditions/_HasFirstPrestiged", false);

        conditions.Add("conditions/prestige1_temp/_HasChosenClass", false);
        conditions.Add("conditions/prestige1_temp/_HasCompletedZone1", false);
        conditions.Add("conditions/prestige1_temp/_HasCompletedZone2", false);
        conditions.Add("conditions/prestige1_temp/_HasCompletedZone3", false);
        conditions.Add("conditions/prestige1_temp/_ReadyToPrestige", false);

        conditions.Add("conditions/prestige1_temp/_skillTree2", true);
        conditions.Add("conditions/prestige2_temp/_unlockedEnnemyLab", false);
        conditions.Add("conditions/prestige2_temp/_unlockedBosses", false); //true for testing purpose
        conditions.Add("conditions/prestige2_temp/_unlockedVillageSkip", false);
        conditions.Add("conditions/prestige2_temp/_unlockedWarrior", false);


    }

    public void Prestige1Reset()
    {
        SaveCondition("conditions/prestige1_temp/_HasChosenClass", false);
        SaveCondition("conditions/prestige1_temp/_HasCompletedZone1", false);
        SaveCondition("conditions/prestige1_temp/_HasCompletedZone2", false);
        SaveCondition("conditions/prestige1_temp/_HasCompletedZone3", false);
        SaveCondition("conditions/prestige1_temp/_ReadyToPrestige", false);
    }
}
