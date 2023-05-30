import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    closeForm: () => void;
    activity: Activity | undefined;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({closeForm, activity : selectedActivity, createOrEdit} : Props) {

    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const[activity, setActivity] = useState(intialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleChangeEvent (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event?.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleChangeEvent} />
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleChangeEvent} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleChangeEvent}/>
                <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleChangeEvent}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleChangeEvent}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleChangeEvent}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}