import Location from "../models/location";
import { Request, Response } from "express";

//llistar ubicacions
export const getLocations = async (req: Request, res: Response) => {
    const locations = await Location.findAll();
    res.json(locations);
};

// Obtenir una ubicació específica
export const getLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (location) {
        res.json(location);
    } else {
        res.status(404).json({
            msg: `No existeix una ubicació amb l'ID ${id}`,
        });
    }
}

//afegir una nova ubicació 
export const postLocation = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const location = await Location.create(body);
        res.json({
            msg: 'Ubicació afegida correctament!',
            location,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear la ubicació',
        });
    }
};

// Actualitzar una ubicació 
export const updateLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({
                msg: `No existeix una ubicació amb l'id ${id}`,
            });
        }

        await location.update(body);
        res.json({
            msg: 'ubicació actualitzada amb èxit',
            location,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error actualitzant ubicació',
        });

    }
};

// Eliminar una ubicació 
export const deleteLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (!location) {
        return res.status(404).json({
            msg: `No existeix una ubicació amb la id ${id}`,
        });
    }

    await location.destroy();
    res.json({
        msg: 'ubicaió eliminada correctament!',
    });
};

// Eliminar totes les ubicacions
export const deleteAllLocations = async (req: Request, res: Response) => {
    try {
        await Location.destroy({ where: {}, truncate: true });
        res.json({
            msg: 'Totes les ubicacions han estat eliminades correctament!',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error eliminant totes les ubicacions',
        });
    }
};
