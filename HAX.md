* in node_modules/apollo-client/bundle.esm.js, replace
  "{ field: field}"
    -- with --
  "{ field: field, fragmentMap: execContext.fragmentMap}"

