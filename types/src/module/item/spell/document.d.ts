/// <reference types="jquery" resolution-mode="require"/>
import type { ActorPF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e, ItemSummaryData } from "@item/base/data/index.ts";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick.ts";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry/types.ts";
import { RangeData } from "@item/types.ts";
import { MeasuredTemplatePF2e } from "@module/canvas/index.ts";
import { ChatMessagePF2e, ItemOriginFlag } from "@module/chat-message/index.ts";
import { OneToTen, Rarity, ZeroToTwo } from "@module/data.ts";
import type { UserPF2e } from "@module/user/index.ts";
import { type TokenDocumentPF2e } from "@scene/index.ts";
import { CheckRoll } from "@system/check/index.ts";
import { DamageRoll } from "@system/damage/roll.ts";
import { DamageKind, DamageRollContext, SpellDamageTemplate } from "@system/damage/types.ts";
import { StatisticRollParameters } from "@system/statistic/index.ts";
import { EnrichmentOptionsPF2e } from "@system/text-editor.ts";
import { SpellArea, SpellHeightenLayer, SpellOverlayType, SpellSource, SpellSystemData } from "./data.ts";
import { SpellOverlayCollection } from "./overlay.ts";
import { MagicTradition, SpellTrait } from "./types.ts";
interface SpellConstructionContext<TParent extends ActorPF2e | null> extends DocumentConstructionContext<TParent> {
    fromConsumable?: boolean;
}
declare class SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly isFromConsumable: boolean;
    /** The original spell. Only exists if this is a variant */
    original?: SpellPF2e<NonNullable<TParent>>;
    /** The overlays that were applied to create this variant */
    appliedOverlays?: Map<SpellOverlayType, string>;
    /** Set if casted with trick magic item. Will be replaced via overriding spellcasting on cast later. */
    trickMagicEntry: TrickMagicItemEntry<NonNullable<TParent>> | null;
    overlays: SpellOverlayCollection;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext<TParent>);
    /** The spell's "base" rank; that is, before heightening */
    get baseRank(): OneToTen;
    /** Legacy getter, though not yet deprecated */
    get baseLevel(): OneToTen;
    /**
     * Heightened rank of the spell if heightened, otherwise base.
     * This applies for spontaneous or innate spells usually, but not prepared ones.
     */
    get rank(): number;
    /** Legacy getter, though not yet deprecated */
    get level(): number;
    get traits(): Set<SpellTrait>;
    get rarity(): Rarity;
    get traditions(): Set<MagicTradition>;
    get spellcasting(): BaseSpellcastingEntry<NonNullable<TParent>> | null;
    get isAttack(): boolean;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get attribute(): AttributeString;
    /** @deprecated */
    get ability(): AttributeString;
    /** Whether this spell has unlimited uses */
    get unlimited(): boolean;
    get isVariant(): boolean;
    get hasVariants(): boolean;
    get area(): (SpellArea & {
        label: string;
    }) | null;
    /** Dummy getter for interface alignment with weapons and actions */
    get range(): RangeData | null;
    /** Whether the "damage" roll of this spell deals damage or heals (or both, depending on the target) */
    get damageKinds(): Set<DamageKind>;
    get uuid(): ItemUUID;
    /** Given a slot level, compute the actual level the spell will be cast at */
    computeCastRank(slotRank?: number): number;
    getRollData(rollOptions?: {
        castLevel?: number | string;
    }): NonNullable<EnrichmentOptions["rollData"]>;
    getDamage(params?: SpellDamageOptions): Promise<SpellDamage | null>;
    /**
     * Loads an alternative version of this spell, called a variant.
     * The variant is created via the application of one or more overlays based on parameters.
     * This handles heightening as well as alternative cast modes of spells.
     * If there's nothing to apply, returns null.
     */
    loadVariant(options?: {
        castLevel?: number;
        overlayIds?: string[];
    }): SpellPF2e<NonNullable<TParent>> | null;
    getHeightenLayers(rank?: number): SpellHeightenLayer[];
    createTemplate(message?: ChatMessagePF2e): MeasuredTemplatePF2e;
    placeTemplate(message?: ChatMessagePF2e): void;
    prepareBaseData(): void;
    prepareSiblingData(this: SpellPF2e<ActorPF2e>): void;
    prepareActorData(): void;
    getRollOptions(prefix?: string): string[];
    toMessage(event?: MouseEvent | JQuery.TriggeredEvent, { create, data, rollMode }?: SpellToMessageOptions): Promise<ChatMessagePF2e | undefined>;
    getChatData(this: SpellPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e, rollOptions?: {
        castLevel?: number | string;
        slotLevel?: number | string;
    }): Promise<Omit<ItemSummaryData, "traits">>;
    rollAttack(this: SpellPF2e<ActorPF2e>, event: MouseEvent | JQuery.ClickEvent, attackNumber?: number, context?: StatisticRollParameters): Promise<void>;
    rollDamage(this: SpellPF2e<ActorPF2e>, event: MouseEvent | JQuery.ClickEvent, mapIncreases?: ZeroToTwo): Promise<Rolled<DamageRoll> | null>;
    /** Roll counteract check */
    rollCounteract(event?: MouseEvent | JQuery.ClickEvent): Promise<Rolled<CheckRoll> | null>;
    getOriginData(): ItemOriginFlag;
    update(data: Record<string, unknown>, options?: DocumentUpdateContext<TParent>): Promise<this | undefined>;
    protected _preCreate(data: this["_source"], options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<SpellSource>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: SpellSource;
    system: SpellSystemData;
}
interface SpellDamage {
    template: SpellDamageTemplate;
    context: DamageRollContext;
}
interface SpellToMessageOptions {
    create?: boolean;
    rollMode?: RollMode;
    data?: {
        castLevel?: number;
    };
}
interface SpellDamageOptions {
    rollMode?: RollMode | "roll";
    skipDialog?: boolean;
    target?: Maybe<TokenDocumentPF2e>;
}
export { SpellPF2e, type SpellToMessageOptions };
