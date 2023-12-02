import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage(){
    return (
        <>
        {/* Lets use this page for testing error end points */}

        <Container>
            <Typography gutterBottom variant="h2">Testing Errors</Typography>

            <ButtonGroup>
                <Button variant="contained" onClick={()=> agent.TestErrors.get400Error()}>Test 400</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get401Error()}>Test 401</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get404Error()}>Test 404</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get500Error()}>Test 500</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.getValidationError()}>Test Validation Error</Button>
            </ButtonGroup>
        </Container>
        </>
    )
}