import React from "react";

const PreferenceList = ({ preferences, onEdit, onDelete }) => {
    return (
        <div class="container">
        <h2>Preference List</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {preferences.map((preference) => (
                <tr key={preference.id}>
                    <td>{preferences.indexOf(preference) + 1}</td>
                    <td>{preference.id}</td>
                    <td>{preference.name}</td>
                    <td>{preference.description}</td>
                    <td>
                    <button class="btn btn-outline-warning m-2" onClick={() => onEdit(preference)}>Edit</button>
                    <button class="btn btn-outline-danger m-2" onClick={() => onDelete(preference.id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
    }

export default PreferenceList;