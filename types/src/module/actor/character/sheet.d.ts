/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { CharacterPF2e } from ".";
import { CreatureSheetPF2e } from "../creature/sheet";
import { CraftingFormula } from "./crafting";
import { CharacterStrike } from "./data";
import { CharacterSheetData, CraftingEntriesSheetData } from "./data/sheet";
declare class CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    private knownFormulas;
    private formulaQuantities;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<CharacterSheetData>;
    /** Organize and classify Items for Character sheets */
    protected prepareItems(sheetData: ActorSheetDataPF2e<CharacterPF2e>): void;
    private prepareSpellcasting;
    protected prepareCraftingFormulas(): Promise<Record<number, CraftingFormula[]>>;
    protected prepareCraftingEntries(): Promise<CraftingEntriesSheetData>;
    /** Disable the initiative button located on the sidebar */
    disableInitiativeButton(): void;
    /** Enable the initiative button located on the sidebar */
    enableInitiativeButton(): void;
    activateListeners($html: JQuery): void;
    /** Contextually search the feats tab of the Compendium Browser */
    private onClickBrowseFeatCompendia;
    /** Handle changing of proficiency-rank via dropdown */
    private onChangeAdjustStat;
    /** Handle clicking of proficiency-rank adjustment buttons */
    private onClickAdjustStat;
    /** Handle changing of lore and spellcasting entry proficiency-rank via dropdown */
    private onChangeAdjustItemStat;
    /** Handle clicking of lore and spellcasting entry adjustment buttons */
    private onClickAdjustItemStat;
    private onIncrementModifierValue;
    private onDecrementModifierValue;
    private onAddCustomModifier;
    private onRemoveCustomModifier;
    /** Handle cycling of dying, wounded, or doomed */
    private onClickDyingWounded;
    private getNearestSlotId;
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasData<"Item", ItemPF2e>): Promise<ItemPF2e[]>;
    protected _onDrop(event: ElementDragEvent): Promise<boolean | void>;
    /**
     * Handle a drop event for an existing Owned Item to sort that item
     * @param event
     * @param itemData
     */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Get the font-awesome icon used to display a certain dying value */
    private getDyingIcon;
    /** Get the font-awesome icon used to display a certain wounded value */
    private getWoundedIcon;
    /** Get the font-awesome icon used to display hero points */
    private getHeroPointsIcon;
}
interface CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    getStrikeFromDOM(target: HTMLElement): CharacterStrike | null;
}
export { CharacterSheetPF2e };
