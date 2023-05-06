IDRegistry.genBlockID("yellorium_ore");
Block.createBlock("yellorium_ore", [
	{name: "Yellorium Ore", texture: [["oreyellorite", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.yellorium_ore, "stone");
ToolAPI.registerBlockDiggingLevel(BlockID.yellorium_ore, 3);

Callback.addCallback("GenerateChunk", function(X, Z, random, id, chunkSeed, worldSeed, dimensionSeed){
    for (let i = 0; i < 4; i++) {
        let coords = GenerationUtils.randomCoords(X, Z, 0, 50);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.yellorium_ore, 0, Utils.getRandomArbitrary(2, 5), false, dimensionSeed);
    }
});
