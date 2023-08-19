import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityForm from '../form/ActivityForm';
import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard() {
    
    const {activityStore} = useStore();

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {activityStore.selectedActivity && !activityStore.editMode &&
                <ActivityDetails />}
                {activityStore.editMode && 
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})