const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Requests } = this.entities;

  this.after('CREATE', 'Requests', async (req) => {
    try {
      const wfAPI = await cds.connect.to('spa_process_destination');

      // Build workflow context payload using actual values from req.data
      const workflowContext = {
        definitionId: 'us10.32b6c6c3trial.processflowtrainingrequest.trainingrequestprocess',
        context: {
          employee: req.data.employee,
          title: req.data.title
        }
      };

      console.log(`[INFO] Workflow context payload: ${JSON.stringify(workflowContext)}`);

      // Send the POST request to create a workflow instance
      const result = await wfAPI.send('POST', '/workflow/rest/v1/workflow-instances', workflowContext, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`[INFO] Workflow started successfully. Response: ${JSON.stringify(result)}`);
      return result;

    } catch (workflowError) {
      console.error(`[ERROR] Workflow posting failed for ID: ${req.data.ID} - ${workflowError.message}`);
    }
  });
});
