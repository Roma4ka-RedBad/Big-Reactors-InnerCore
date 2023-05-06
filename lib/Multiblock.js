/*
Автор: Reider ___
Внимание! Запрещено:
    1.Распространение библиотеки на сторонних источниках без указание ссылки на официальное сообщество
    2.Изменение кода
    3.Явное копирование кода

    Используя библиотеку вы автоматически соглашаетесь с этими правилами.
*/
LIBRARY({
	name: "Multiblock",
	version: 2,
	shared: true,
	api: "CoreEngine"
});
let blocksCheck = [
	{x: 0, y: -1, z: 0},
	{x: 0, y: 1, z: 0},
	{x: -1, y: 0, z: 0},
	{x: 1, y: 0, z: 0},
	{x: 0, y: 0, z: -1},
	{x: 0, y: 0, z: 1},
];
let MultiBlock = {
	multiblocks: {},
	register(name, blocks, center, obj, size){
		this.multiblocks[name] = {
			blocks: blocks,
			center: center,
			size: size,
			funcs: {
				start: obj.start || function(){},
				isCenter: obj.isCenter || function(){return true},
				isSide: obj.isSide || function(){return true},
				end: obj.end || function(){}
			}
		};
	},
	getBlocks(pos, region, multiblock, center, list){
		list = list || [];
		let result = [];
		for(let i in blocksCheck){
			let v = blocksCheck[i];
			let coords = {x: v.x + pos.x, y: v.y + pos.y, z: v.z + pos.z};
			let id = region.getBlockId(coords.x, coords.y, coords.z);
			let key = coords.x+"."+coords.y+"."+coords.z;
			if((multiblock.indexOf(id) != -1 || center.indexOf(id) != -1) && list.indexOf(key) == -1){
				list.push(key);
				result.push(coords);
				let bl = this.getBlocks(coords, region, multiblock, center, list);
				for(let a in bl)
					result.push(bl[a]);
			}
		}
		return result;
	},
	get(blocks, func){
		let result = blocks[0];
		for(let i in blocks){
			let pos = blocks[i];
			result = {x: func(pos.x, result.x), y: func(pos.y, result.y), z: func(pos.z, result.z)};
		}
		return result;
	},
	can(name, tile){
		return this.is(name, tile.x, tile.y, tile.z, tile.blockSource, tile);
	},
	isSide(x, y, z, min, max){
		return (x == min.x || x == max.x) || (y == min.y || y == max.y) || (z == min.z || z == max.z);
	},
	run(min, max, func){
		for(let x = min.x;x <= max.x;x++)
			for(let y = min.y;y <= max.y;y++)
				for(let z = min.z;z <= max.z;z++)
					if(!func(x, y, z))
						return false;
		return true;
	},
	is(name, x, y, z, region, tile){
		let multiblock = this.multiblocks[name];
		let blocks = this.getBlocks({x: x, y: y, z: z}, region, multiblock.blocks, multiblock.center);
		if(blocks.length == 0) return false;
		let min = this.get(blocks, Math.min);
		let max = this.get(blocks, Math.max);
		if(max.x - min.x + 1 < multiblock.size.x || max.y - min.y + 1 < multiblock.size.y || max.z - min.z + 1 < multiblock.size.z) return false;
		multiblock.funcs.start(tile, min, max, blocks);
		let result = this.run(min, max, function(x, y, z){
			let id = region.getBlockId(x, y, z);
			if(MultiBlock.isSide(x, y, z, min, max)){
				if(multiblock.blocks.indexOf(id) == -1 || !multiblock.funcs.isSide(tile, x, y, z, id))
					return false;
			}else if(multiblock.center.indexOf(id) == -1 || !multiblock.funcs.isCenter(tile, x, y, z, id))
				return false;
			return true;
		});
		let end_func = multiblock.funcs.end(tile, min, max, blocks, result);
		return (end_func == undefined) ? result : end_func;
	}
};

EXPORT("MultiBlock", MultiBlock);