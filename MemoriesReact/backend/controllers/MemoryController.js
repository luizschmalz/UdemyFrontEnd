const Memory = require('../models/Memory')

const fs = require("fs")

const removeOldImage = (memory => {
    fs.unlink(`public/${memory.src}`, (err) => {
        if (err){
            console.log(err)
        }else{
            console.log("imagem excluida c sucesso")
        }
    })
})

const createMemory = async (req, res) => {
    try{

        const {title, description} = req.body

        const src = `images/${req.file.filename}`

        if (!title || !description){
            return res.status(400).json({msg: "preencha todos os campos"})
        }

        const newMemory = new Memory({
            title, src, description
        })

        await newMemory.save()

        res.json({msg: "memória criada com sucesso", newMemory})

    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const getMemories = async(req, res) => {
    try{
        const memories = await Memory.find()

        res.json(memories)
    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const getMemory = async (req, res) => {
    try{
        
        const memory = await Memory.findById(req.params.id)

        if(!memory){
            return res.status(404).json({msg: 'memória não encontrada'})
        }

        res.json(memory)

    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const deleteMemory = async (req, res) => {
    try{
        
        const memory = await Memory.findByIdAndDelete(req.params.id)

        if(!memory){
            return res.status(404).json({msg: 'memória não encontrada'})
        }

        removeOldImage(memory)

        res.json({msg: "memoria excluida"})

    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const updateMemory = async (req, res) => {
    try{

        const {title, description} = req.body

        let src = null
        
        if(req.file){
            src = `images/${req.file.filename}`
        }

        const memory = await Memory.findById(req.params.id)

        if(!memory){
            return res.status(404).json({msg: "memória nao encontrada"})
        }

        if(src){
            removeOldImage(memory)
        }

        const updateDate = {}

        if(title) updateDate.title = title
        if(description) updateDate.description = description
        if(src) updateData.src = src

        const updateMemory = await Memory.findByIdAndUpdate(
            req.params.id,
            updateDate,
            {new: true}
        )

        res.json({updateMemory, msg: 'memória atualizada'})
    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const toggleFavorite = async(req,res) =>{
    try{

        const memory = await Memory.findById(req.params.id)

        if(!memory){
            return res.status(404).json({msg: "memória nao encontrada"})
        }

        memory.favorite = !memory.favorite

        await memory.save()

        res.json({updateMemory, msg: 'adicionada aos favoritos', memory})
    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}

const addComment = async (req,res) => {
    try{

        const {name, text} = req.body

        if(!name || !text){
            return res.status(400).json({msg: "preencha os campos"})
        }
        
        const comment = {name,text}

        const memory = await Memory.findById(req.params.id)

        if(!memory){
            return res.status(404).json({msg: "memória nao encontrada"})
        }

        memory.comments.push(comment)

        await memory.save()

        res.json({updateMemory, msg: 'comentario adicionado', memory})
    }catch(err){
        console.log(err.message)
        res.status(500).send('ocorreu um erro!')
    }
}


module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
    toggleFavorite,
    addComment,
}