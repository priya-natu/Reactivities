import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';

export default function ActivityDetails () {

    const {activityStore} = useStore();
    const {selectedActivity: activity} = activityStore;

    if (!activity) return <LoadingComponents />;

    return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
            <Button onClick={() => activityStore.openForm(activity.id)} basic color='blue' content='Edit' />
            <Button onClick={activityStore.cancelSelectedActivity} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
    )
  }