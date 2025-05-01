import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';

function RecipeApp() {
    const [recipes, setRecipes] = useState([]);
    const [form, setForm] = useState({ name: '', ingredients: '', instructions: '', prepTime: '' });

    const fetchRecipes = async () => {
        const res = await fetch('http://localhost:5292/api/Recipes/');
        const data = await res.json();
        setRecipes(data);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5292/api/Recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, prepTime: parseInt(form.prepTime) })
        });
        setForm({ name: '', ingredients: '', instructions: '', prepTime: '' });
        fetchRecipes();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5292/api/Recipes/${id}`, {
            method: 'DELETE'
        });
        fetchRecipes();
    };

    return (
        <Container>
            <h1 className="mt-4 mb-4">Recipe Manager</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Control placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control placeholder="Ingredients" name="ingredients" value={form.ingredients} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control placeholder="Instructions" name="instructions" value={form.instructions} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control placeholder="Prep Time (min)" name="prepTime" value={form.prepTime} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit">Add Recipe</Button>
            </Form>

            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Prep Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {recipes.map((r) => (
                    <tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.ingredients}</td>
                        <td>{r.instructions}</td>
                        <td>{r.prepTime} min</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default RecipeApp;
