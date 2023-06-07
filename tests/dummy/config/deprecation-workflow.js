/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-global" },
    { handler: "silence", matchId: "this-property-fallback" },
    { handler: "silence", matchId: "ensure-safe-component.string" },
    { handler: "silence", matchId: "deprecated-run-loop-and-computed-dot-access" },
    { handler: "silence", matchId: "ember-metal.get-with-default" },
    { handler: "silence", matchId: "ember-utils.try-invoke" },
    { handler: "silence", matchId: "ember-string.loc" }
  ]
};
