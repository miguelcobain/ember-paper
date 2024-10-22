/* eslint-disable no-undef, prettier/prettier */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "deprecated-run-loop-and-computed-dot-access" },
    { handler: "silence", matchId: "ember-global" },
    { handler: "silence", matchId: "ember-metal.get-with-default" },
    { handler: "silence", matchId: "ember-modifier.no-args-property" },
    { handler: "silence", matchId: "ember-modifier.no-element-property" },
    { handler: "silence", matchId: "ember-modifier.use-destroyables" },
    { handler: "silence", matchId: "ember-modifier.use-modify" },
    { handler: "silence", matchId: "ember-string.loc" },
    { handler: "silence", matchId: "ember-utils.try-invoke" },
    { handler: "silence", matchId: "ensure-safe-component.string" },
    { handler: "silence", matchId: "this-property-fallback" },
  ]
};
