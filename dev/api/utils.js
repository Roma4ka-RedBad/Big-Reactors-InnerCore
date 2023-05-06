let Utils = {
    getRandomArbitrary: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    createBlockRotations: function(blockId, data) {
        TileRenderer.setStandardModelWithRotation(blockId, data[0][0], data[0][1]);
        TileRenderer.setRotationFunction(blockId);
        for (let i = 0; i < data.length; i++) {
            TileRenderer.registerModelWithRotation(blockId, data[i][0], data[i][1])
        }
    },
    getAddable: function(max, total, added) {
        return Math.min(max - total, added)
    },
    addToSlot: function(container, slot, validIds, targetItemID, addableCount, targetItemData) {
        let addable = this.getAddable(Item.getMaxStack(targetItemID), slot.count, addableCount);
        if (validIds.indexOf(slot.id) != -1 && addable > 0) {
            container.setSlot(slot.getName(), targetItemID, slot.count+addable, targetItemData);
            return addable
        }
        return 0
    }
}

const BLOCK_TYPE_MACHINE = Block.createSpecialType({
	destroytime: 1.0,
	explosionres: 1900000000.0,
	base: 1
});

const BLOCK_TYPE_GLASS = Block.createSpecialType({ 
    solid: false,
    material: 16,
    destroytime: 0.3,
    explosionres: 1.5,
    renderlayer: 3,
    rendertype: 0,
    translucency: 1,
    lightopacity: 0,
    sound: "glass"
});
