IDRegistry.genBlockID("reactor_plate");
IDRegistry.genBlockID("reactor_glass");
Block.createBlock("reactor_plate", [
	{name: "Reactor Casing", texture: [["reactor.plate", 0]], inCreative: true}
], BLOCK_TYPE_MACHINE);
ToolAPI.registerBlockMaterial(BlockID.reactor_plate, "stone");

Block.createBlock("reactor_glass", [
	{name: "Reactor Glass", texture: [["reactor.glass", 0]], inCreative: true}
], BLOCK_TYPE_GLASS);
ConnectedTexture.setModelForGlass(BlockID.reactor_glass, 0, "reactor.glass");
