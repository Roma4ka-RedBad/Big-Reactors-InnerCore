IDRegistry.genBlockID("yellorium_block");
IDRegistry.genBlockID("cyanite_block");
IDRegistry.genBlockID("graphite_block");

Block.createBlock("yellorium_block", [
	{name: "Yellorium Block", texture: [["blockyellorium", 0]], inCreative: true}
]);
Block.createBlock("graphite_block", [
	{name: "Graphite Block", texture: [["blockgraphite", 0]], inCreative: true}
]);
Block.createBlock("cyanite_block", [
	{name: "Cyanite Block", texture: [["blockcyanite", 0]], inCreative: true}
]);
