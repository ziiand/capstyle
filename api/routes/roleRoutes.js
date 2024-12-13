import express from 'express';
import Role from '../models/roleModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const roles = await Role.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des rôles' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.getRoleById(id);
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ message: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du rôle' });
    }
});

router.post('/', async (req, res) => {
    const { role } = req.body;

    if (!role || role.trim() === "") {
        return res.status(400).json({ message: 'Le rôle est requis' });
    }

    try {
        const newRoleId = await Role.createRole(role);
        res.status(201).json({ id: newRoleId, message: 'Rôle créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du rôle' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || role.trim() === "") {
        return res.status(400).json({ message: 'Le rôle est requis pour la mise à jour' });
    }

    try {
        const existingRole = await Role.getRoleById(id);
        if (!existingRole) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }

        await Role.updateRole(id, role);
        res.json({ message: 'Rôle mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const existingRole = await Role.getRoleById(id);
        if (!existingRole) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }

        await Role.deleteRole(id);
        res.json({ message: 'Rôle supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du rôle' });
    }
});

export default router;
