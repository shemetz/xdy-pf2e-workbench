import { ActorAttributes, ActorAttributesSource, ActorDetails, ActorDetailsSource, ActorHitPoints, ActorSystemData, ActorSystemSource, ActorTraitsData, ActorTraitsSource, BaseActorSourcePF2e, BaseHitPointsSource } from "@actor/data/base.ts";
import { ARMY_TYPES } from "./values.ts";
import { ActorSizePF2e } from "@actor/data/size.ts";
import { ValueAndMax } from "@module/data.ts";
import { Alignment } from "./types.ts";
type ArmySource = BaseActorSourcePF2e<"army", ArmySystemSource>;
interface ArmySystemSource extends ActorSystemSource {
    attributes: ArmyAttributesSource;
    details: ArmyDetailsSource;
    traits: ArmyTraitsSource;
    consumption: number;
    weapons: {
        bonus: number;
        ranged: {
            name: string;
            unlocked: boolean;
            potency: number;
        };
        melee: {
            name: string;
            unlocked: boolean;
            potency: number;
        };
    };
    resources: {
        /** How often this army can use ranged attacks */
        ammunition: ValueAndMax;
        potions: ValueAndMax;
    };
}
interface ArmyAttributesSource extends ActorAttributesSource {
    perception?: never;
    immunities?: never;
    weaknesses?: never;
    resistances?: never;
    hp: ArmyHitPointsSource;
    ac: ArmyArmorClass;
}
interface ArmyHitPointsSource extends Required<BaseHitPointsSource> {
    /** Typically half the army's hit points, armies that can't be feared have a threshold of 0 instead */
    routThreshold?: number;
}
interface ArmyArmorClass {
    value: number;
    potency: number;
    details: string;
}
interface ArmyTraitsSource extends Required<ActorTraitsSource<string>> {
    languages?: never;
    type: (typeof ARMY_TYPES)[number];
    senses?: never;
    alignment: Alignment;
}
interface ArmyDetailsSource extends Required<ActorDetailsSource> {
    strongSave: string;
    weakSave: string;
    description: string;
    blurb: string;
}
interface ArmySystemData extends Omit<ArmySystemSource, "attributes">, ActorSystemData {
    attributes: ArmyAttributes;
    traits: ArmyTraits;
    details: ArmyDetails;
}
interface ArmyAttributes extends Omit<ArmyAttributesSource, "immunities" | "weaknesses" | "resistances" | "perception">, ActorAttributes {
    hp: ArmyHitPoints;
    ac: ArmyArmorClass;
}
interface ArmyHitPoints extends ArmyHitPointsSource, ActorHitPoints {
    negativeHealing: boolean;
    unrecoverable: number;
    routThreshold: number;
}
interface ArmyTraits extends ArmyTraitsSource, ActorTraitsData<string> {
    size: ActorSizePF2e;
}
interface ArmyDetails extends ArmyDetailsSource, ActorDetails {
}
export type { ArmySource, ArmySystemData };
