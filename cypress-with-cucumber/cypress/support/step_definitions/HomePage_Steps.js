/// <reference types="cypress" />
import {Given} from "@badeball/cypress-cucumber-preprocessor/esbuild";


const url="https://www.webdriveruniversity.com/";

Given(`I navigate to the webdriveruniversity homepage`, ()=>{
    cy.visit(url);

})
