const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Connexion à MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error("Erreur de connexion à MongoDB:", err);
    return;
  }
  console.log("Connecté à MongoDB");
  const db = client.db("family_tasks");

  // Ajoutez ici vos routes Express qui utilisent la base de données

  // Exemple de route pour obtenir toutes les tâches
  app.get('/tasks', async (req, res) => {
    const tasks = await db.collection('tasks').find().toArray();
    res.send(tasks);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// ...

// Exemple de route pour ajouter une tâche
app.post('/tasks', async (req, res) => {
    const newTask = req.body;
    const result = await db.collection('tasks').insertOne(newTask);
    res.send(result.ops[0]);
  });
  
  // Exemple de route pour mettre à jour une tâche
  app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const result = await db.collection('tasks').updateOne({ _id: ObjectId(taskId) }, { $set: updatedTask });
    res.send(result.modifiedCount > 0 ? 'Tâche mise à jour avec succès' : 'Aucune tâche mise à jour');
  });
  
  // Exemple de route pour supprimer une tâche
  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const result = await db.collection('tasks').deleteOne({ _id: ObjectId(taskId) });
    res.send(result.deletedCount > 0 ? 'Tâche supprimée avec succès' : 'Aucune tâche supprimée');
  });
  
  // ...  