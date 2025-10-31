using { com.cy.trainingrequest as tr } from '../db/schema';

service TrainingRequestService {
  entity Requests as projection on tr.Requests;

  function getGreetings ( input : Integer ) returns String ;
}