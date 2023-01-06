import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
function App() {
const search = window.location.search;
const params = new URLSearchParams(search);
const form = params.get('form') || 'sample';
const editor = params.get('editor') || false;
  const { register, handleSubmit, errors } = useForm();
  const init = JSON.parse(localStorage.getItem(form)) || [];
  const [formFields, setFormFields] = useState(init);
  const [ formName, setFormName] = useState(form);
  let startData = null;
   if(!editor){
       startData = {name: formName, fields: formFields};
      }
      const [save, setSave] = useState(startData);
        const displayForm = () => {
            localStorage.setItem(formName,JSON.stringify(formFields));
            setSave({name: formName, fields: formFields});
          };
   const addField = () => {
    setFormFields([...formFields, { type: 'text', name: '' }]);
  };

  const updateField = (event, index) => {
    const updatedFields = [...formFields];
    updatedFields[index][event.target.name] = event.target.value;
    setFormFields(updatedFields);
  };
  const updatFormName = (value) => {
  setFormName(value);
  }
  const removeField = index => {
    setFormFields(formFields.filter((field, i) => i !== index));
  };

  return (
    <Container>
    { editor && <Form>
          Form Name<input
              name="formName"
                  defaultValue={formName}
                  onChange={event => updatFormName(event.target.value)}
                />
      {formFields.map((field, index) => (
        <Row><div key={index}>
          <label htmlFor={field.name}>Field Name</label>
          <input
            name="name"
            defaultValue={field.name}
            onChange={event => updateField(event, index)}
          />
          Field Type
          <select
            name="type"
            value={field.type}
            onChange={event => updateField(event, index)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
             <option value="password">Password</option>
          </select>
          <Button type="button" onClick={() => removeField(index)} variant="danger">
            Remove Field
          </Button>
        </div></Row>
      ))}
      <Button type="button" onClick={addField}>
        Add Field
      </Button>
      <Button type="button" onClick={displayForm} variant="success" >save</Button>
    </Form> }
    <Form>
         {save && (<Container><br/><br/>
          <div>Preview {save.name}</div>
                {save.fields.map((field, index) => (
                  <Row key={index}>
                    <label htmlFor={field.name}>{field.name}</label>
                    <input
                      name={field.name}
                      defaultValue=""
                      type={field.type}
                    />
                    </Row>))
                    }
                    <Row> <Button type="button" variant="success" >Submit</Button></Row>
          </Container>)}
     </Form>
    </Container>
  );
}

export default App;