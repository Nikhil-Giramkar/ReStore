import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors(){
        agent.TestErrors.getValidationError()
            .then(() => console.log('Should not see this as promise will be rejected'))
            .catch(errors => setValidationErrors(errors))
            //Since we modified axios interceptor to throw an array of problems for Validation Errors, 
            //we can set validation error as string array
    }

    return (
        <>
        {/* Lets use this page for testing error end points */}

        <Container>
            <Typography gutterBottom variant="h2">Testing Errors</Typography>

            <ButtonGroup>
                <Button variant="contained" onClick={()=> agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={getValidationErrors}>Test Validation Error</Button>
            </ButtonGroup>

            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List> 
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
        </>
    )
}