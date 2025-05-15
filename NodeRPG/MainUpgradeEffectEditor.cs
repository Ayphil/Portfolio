#if UNITY_EDITOR

using UnityEditor;
using UnityEngine;

// CustomPropertyDrawer attribute specifies that this drawer is used for properties of type UpgradeEffects.
[CustomPropertyDrawer(typeof(MainUpgradeEffects))]
public class MainUpgradeEffectEditor : PropertyDrawer
{
    // OnGUI is the main method to define how the property is drawn in the Inspector.
    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        // Begin drawing the property.
        EditorGUI.BeginProperty(position, label, property);

        // Calculate rects for each field. This helps to position them correctly in the Inspector.
        // Start with the upgradeType field.
        var upgradeTypeRect = new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight);

        // Draw the upgradeType field. Always visible.
        var upgradeTypeProp = property.FindPropertyRelative("upgradeType");
        EditorGUI.PropertyField(upgradeTypeRect, upgradeTypeProp, new GUIContent("Upgrade Type"));

        // Determine the type of upgrade to decide which fields to show.
        MainUpgradeEffects.UpgradeTypes upgradeType = (MainUpgradeEffects.UpgradeTypes)upgradeTypeProp.enumValueIndex;

        // Adjust position for subsequent fields
        position.y += EditorGUIUtility.singleLineHeight + 2;

        // Draw fields based on the selected upgradeType
        switch (upgradeType)
        {
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStat:
                // Draw statType and statQuantity for these types.
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statQuantity"), new GUIContent("Stat Quantity"));
                break;
                
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStatAdditiveModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (+)"));
                break;
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStatMultiplicativeModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (+)"));
                break;

            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStat:
                // Draw statType and statQuantity for these types.
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("secondaryStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statQuantity"), new GUIContent("Stat Quantity"));
                break;

            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStatAdditiveModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("secondaryStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (+)"));
                break;
            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStatMultiplicativeModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("secondaryStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (+)"));
                break;

            case MainUpgradeEffects.UpgradeTypes.AddClassStat:
                // Draw statType and statQuantity for these types.
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("classStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statQuantity"), new GUIContent("Stat Quantity"));
                break;

            case MainUpgradeEffects.UpgradeTypes.AddClassStatAdditiveModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("classStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (+)"));
                break;
            case MainUpgradeEffects.UpgradeTypes.AddClassStatMultiplicativeModifier:
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("classStatType"), new GUIContent("Stat Type"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statModifier"), new GUIContent("Percent more (x)"));
                break;

            case MainUpgradeEffects.UpgradeTypes.ClassConditionStat:
                // Draw featureName for this type.
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("ConditonClassStatType"), new GUIContent("Condition"));
                position.y += EditorGUIUtility.singleLineHeight + 2;
                EditorGUI.PropertyField(new Rect(position.x, position.y, position.width, EditorGUIUtility.singleLineHeight), property.FindPropertyRelative("statValue"), new GUIContent("New value"));
                break;
        }

        // End drawing the property.
        EditorGUI.EndProperty();
    }

    // GetPropertyHeight defines the height of the property drawer based on the selected upgradeType.
    public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
    {
        // Retrieve the upgradeType property.
        var upgradeTypeProp = property.FindPropertyRelative("upgradeType");
        MainUpgradeEffects.UpgradeTypes upgradeType = (MainUpgradeEffects.UpgradeTypes)upgradeTypeProp.enumValueIndex;

        // Base height includes the upgradeType field.
        float height = EditorGUIUtility.singleLineHeight + 2; // upgradeType

        // Adjust height based on the selected upgradeType
        switch (upgradeType)
        {
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStatAdditiveModifier:
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStatMultiplicativeModifier:
            case MainUpgradeEffects.UpgradeTypes.AddPrimaryStat:
            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStat:
            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStatAdditiveModifier:
            case MainUpgradeEffects.UpgradeTypes.AddSecondaryStatMultiplicativeModifier:
            case MainUpgradeEffects.UpgradeTypes.AddClassStat:
            case MainUpgradeEffects.UpgradeTypes.AddClassStatAdditiveModifier:
            case MainUpgradeEffects.UpgradeTypes.AddClassStatMultiplicativeModifier:
            case MainUpgradeEffects.UpgradeTypes.ClassConditionStat:
                height += 2 * (EditorGUIUtility.singleLineHeight + 2); // statType and statQuantity
                break;
        }

        return height;
    }
}
#endif