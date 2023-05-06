/*checkStructureState: function () {
        let structureBlocks = [BlockID.reactor_plate, BlockID.reactor_glass, BlockID.reactor_controller, BlockID.reactor_controlrod, BlockID.reactor_accessport];
        let structure = new Multistructure(this.x, this.y, this.z, this.blockSource, {
            max_structure_x: 20,
            max_structure_y: 20,
            max_structure_z: 20,
            structureBlocks: structureBlocks
        });

        let blocks = structure.getListBlocks();
        let edges = structure.getListEdges();
        let faces = structure.getListFaces();
        let error_message = "";

        if (blocks[BlockID.reactor_controller].length != 1)
            error_message = "Structure error! Контроллер реактора должен быть один!";

        if (blocks[BlockID.reactor_fuelrod] && blocks[BlockID.reactor_controlrod]) {
            if ((blocks[BlockID.reactor_fuelrod].length / ((structure.getMaxY() - structure.getMinY()) - 1)) != blocks[BlockID.reactor_controlrod].length)
                error_message = "Structure error! Количество стержней и контроллеров не совпадает!"
        } else {
            error_message = "Structure error! Отсутствуют топливные стержни или контроллеры стержней!"
        }

        faces.forEach(function (side) {
            let block_ids = Object.keys(side);
            block_ids.forEach(function (block_id) {
                if (structureBlocks.indexOf(Number(block_id)) == -1)
                    error_message = `Structure error! X: ${side[block_id][0].X} Y: ${side[block_id][0].Y} Z: ${side[block_id][0].Z}`;
            })
        });

        let edges_ids = Object.keys(edges);
        if (edges_ids.length != 1) {

            if (edges_ids[0] != BlockID.reactor_plate) {
                let failed_block = edges[edges_ids[0]][0]
            } else {
                let failed_block = edges[edges_ids[edges_ids.length - 1]][0]
            }

            error_message = `Structure error! X: ${failed_block.X} Y: ${failed_block.Y} Z: ${failed_block.Z}`;
        }

        if (!error_message) {
            return structure
        } else {
            Game.tipMessage(error_message);
        }
}*/