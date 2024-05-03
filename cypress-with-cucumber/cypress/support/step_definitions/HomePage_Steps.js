/// <reference types="cypress" />

import {Given} from "@badeball/cypress-cucumber-preprocessor/esbuild";

Given(`I navigate to the webdriveruniversity homepage`, ()=>{
    const url="http://www.webdriveruniversity.com/";

    cy.visit(url);

})
