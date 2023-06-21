const ctrlReservas = {};
const Reserva = require('../models/Reserva');

ctrlReserva.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true,
                usuarioId: req.usuario.id
            }
        });

        if (!reservas || reservas.length === 0) {
            throw ({
                status: 404,
                message: 'No hay reservas registradas'
            })
        }

        return res.json(reservas);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}


ctrlReserva.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                estado: true
            }
        });

        if (!reserva) {
            throw ({
                status: 404,
                message: 'No existe la reserva'
            })
        }
    
        return res.json(reserva);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Ctrl para crear una tarea
ctrlReserva.crearReserva = async (req, res) => {
    const { titulo, descripcion } = req.body;

    try {
        const reserva = await Reserva.create({
            titulo,
            descripcion,
            usuarioId: req.usuario.id
        });

        if (!reserva) {
            throw ({
                status: 400,
                message: 'No se pudo crear la reserva'
            })
        }

        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


ctrlReserva.actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    
    try {
        const reservaActualizada = await Tarea.update({
            titulo,
            descripcion
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!tareaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la tarea'
            })
        }

        return res.json({
            message: 'Tarea actualizada correctamente',
            tareaActualizada
            
        });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Ctrl para eliminar una tarea
ctrlTarea.eliminarTarea = async (req, res) => {
    const { id } = req.params;

    try {
        const tareaEliminada = await Tarea.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!tareaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la tarea'
            })
        }

        return res.json({tareaEliminada, message: 'Tarea eliminada correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


module.exports = ctrlReservas;