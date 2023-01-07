import  from '../models/Teacher.js' 

  
 export const getTeacher = async (req, res) => { 
     try { 
         const teacher = await Teacher 
             .find({ programId: req.params.programId }) 
             .populate('programId') 
             .select('version year programId') 
         if (teacher.length !== 0) 
             res.status(200).json(teacher) 
         else 
             res.status(204).send() 
     } catch (err) { 
         res.status(500).json({ error: err.message }) 
     } 
 } 
  
 export const getTeacher = async (req, res) => { 
     try { 
         const { id } = req.params 
         const teacher = await Teacher.findById(id) 
             .populate('programId') 
             .select('version year programId') 
         if (teacher) 
             res.status(200).json(teacher) 
         else 
             res.status(404).json({ error: 'resource not found' }) 
     } catch (err) { 
         res.status(500).json({ error: err.message }) 
     } 
 } 
  
 export const addTeacher = async (req, res) => { 
     try { 
         const { version, year } = req.body 
         const programId = req.params.programId 
         const newTeacher = await Teacher.create({ 
             version, 
             year, 
             programId 
         }) 
         const savedTeacher = await newTeacher.save() 
         res.status(201).json({ id: savedTeacher._id }) 
     } catch (err) { 
         res.status(500).json({ error: err.message }) 
     } 
 } 
  
 export const deleteTeacher = async (req, res) => { 
     try { 
         await Teacher.deleteOne({  
             programId: req.params.programId,  
             _id: req.params.id  
         }) 
         res.status(204).send() 
     } catch (err) { 
         res.status(404).json({ error: err.message }) 
     } 
 } 
  
 export const updateTeacher = async (req, res) => { 
     try { 
         const filter = {  
             programId: req.params.programId,  
             _id: req.params.id  
         } 
         const { version, year } = req.body 
         const update = {  
             version: version,  
             year: year 
         } 
  
         await Teacher.findOneAndUpdate(filter, update) 
         res.status(204).send() 
     } catch (err) { 
         console.log(err) 
         res.status(404).json({ error: err.message }) 
     } 
 }