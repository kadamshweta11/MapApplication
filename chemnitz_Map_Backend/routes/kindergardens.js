const express=require('express');
const router=express.Router();
const Kindergarden=require('../models/Kindergarden');

// get all kindergardens

/**
 * @swagger
 * /api/kindergardens:
 *   get:
 *     summary: Get all kindergardens
 *     tags:
 *       - Kindergardens
 *     responses:
 *       200:
 *         description: A list of all kindergardens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kindergarden'
 *       500:
 *         description: Server error
 */
router.get('/',async(req,res)=>{
    try{
        const kindergardens=await Kindergarden.find();
        res.json(kindergardens);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// create new kindergardens
router.post('/', async (req, res) => {
    const kindergarden = new Kindergarden(req.body);
    try {
      const newKindergarden = await kindergarden.save();
      res.status(201).json(newKindergarden);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// get a single kindergarden by id
router.get('/:id', async (req, res) => {
    try {
      const kindergarden = await Kindergarden.findById(req.params.id);
      if (kindergarden == null) {
        return res.status(404).json({ message: 'Kindergarden not found' });
      }
      res.json(kindergarden);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// update a kindergarden by id
router.put('/:id', async (req, res) => {
    try {
      const updatedKindergarden = await Kindergarden.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedKindergarden);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// delete a kindergarden by id
router.delete('/:id', async (req, res) => {
    try {
      const deletedKindergarden = await Kindergarden.findByIdAndRemove(req.params.id);
      res.json(deletedKindergarden);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
