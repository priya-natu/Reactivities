import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import {v4 as uuid} from 'uuid';

export default function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    const[activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    function handleChangeEvent (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event?.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponents content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleChangeEvent} />
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleChangeEvent} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleChangeEvent}/>
                <Form.Input placeholder='Date' type='date' name='date' value={activity.date} onChange={handleChangeEvent}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleChangeEvent}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleChangeEvent}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
