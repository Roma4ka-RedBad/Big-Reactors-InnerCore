Recipes.addShaped({id: BlockID.yellorium_block, count: 1}, [
    "iii",
    "iii",
    "iii"
], ["i", ItemID.yellorium_ingot, 0]);
Recipes.addShaped({id: BlockID.graphite_block, count: 1}, [
    "iii",
    "iii",
    "iii"
], ["i", ItemID.graphite_ingot, 0]);
Recipes.addShaped({id: BlockID.cyanite_block, count: 1}, [
    "iii",
    "iii",
    "iii"
], ["i", ItemID.cyanite_ingot, 0]);
Recipes.addFurnace(BlockID.yellorium_ore, 0, ItemID.yellorium_ingot, 0);
Recipes.addFurnace(VanillaItemID.coal, 0, ItemID.graphite_ingot, 0);
Recipes.addShapeless({id: ItemID.cyanite_ingot, count: 1}, [{id: VanillaBlockID.sand}, {id: ItemID.yellorium_ingot}]);
Recipes.addShapeless({id: ItemID.cyanite_ingot, count: 9}, [{id: BlockID.cyanite_block}]);
Recipes.addShapeless({id: ItemID.yellorium_ingot, count: 9}, [{id: BlockID.yellorium_block}]);
Recipes.addShapeless({id: ItemID.graphite_ingot, count: 9}, [{id: BlockID.graphite_block}]);