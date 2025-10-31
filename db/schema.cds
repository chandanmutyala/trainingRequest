namespace com.cy.trainingrequest;


entity Requests {
  key ID           : UUID;
      employee     : String;
      title        : String;
      description  : String;
      submittedAt  : Timestamp;
      status       : String enum { Submitted; Approved; Rejected };      
      rejectionReason : String;
}


