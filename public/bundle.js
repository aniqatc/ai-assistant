/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 503: /***/ () => {
      (function (Prism) {
        var keywords =
          /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;

        // full package (optional) + parent classes (optional)
        var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/
          .source;

        // based on the java naming conventions
        var className = {
          pattern: RegExp(
            /(^|[^\w.])/.source +
              classNamePrefix +
              /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source,
          ),
          lookbehind: true,
          inside: {
            namespace: {
              pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
              inside: {
                punctuation: /\./,
              },
            },
            punctuation: /\./,
          },
        };

        Prism.languages.java = Prism.languages.extend("clike", {
          string: {
            pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
            lookbehind: true,
            greedy: true,
          },
          "class-name": [
            className,
            {
              // variables, parameters, and constructor references
              // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
              pattern: RegExp(
                /(^|[^\w.])/.source +
                  classNamePrefix +
                  /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/
                    .source,
              ),
              lookbehind: true,
              inside: className.inside,
            },
            {
              // class names based on keyword
              // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
              pattern: RegExp(
                /(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/
                  .source +
                  classNamePrefix +
                  /[A-Z]\w*\b/.source,
              ),
              lookbehind: true,
              inside: className.inside,
            },
          ],
          keyword: keywords,
          function: [
            Prism.languages.clike.function,
            {
              pattern: /(::\s*)[a-z_]\w*/,
              lookbehind: true,
            },
          ],
          number:
            /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
          operator: {
            pattern:
              /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
            lookbehind: true,
          },
          constant: /\b[A-Z][A-Z_\d]+\b/,
        });

        Prism.languages.insertBefore("java", "string", {
          "triple-quoted-string": {
            // http://openjdk.java.net/jeps/355#Description
            pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
            greedy: true,
            alias: "string",
          },
          char: {
            pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
            greedy: true,
          },
        });

        Prism.languages.insertBefore("java", "class-name", {
          annotation: {
            pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
            lookbehind: true,
            alias: "punctuation",
          },
          generics: {
            pattern:
              /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
            inside: {
              "class-name": className,
              keyword: keywords,
              punctuation: /[<>(),.:]/,
              operator: /[?&|]/,
            },
          },
          import: [
            {
              pattern: RegExp(
                /(\bimport\s+)/.source +
                  classNamePrefix +
                  /(?:[A-Z]\w*|\*)(?=\s*;)/.source,
              ),
              lookbehind: true,
              inside: {
                namespace: className.inside.namespace,
                punctuation: /\./,
                operator: /\*/,
                "class-name": /\w+/,
              },
            },
            {
              pattern: RegExp(
                /(\bimport\s+static\s+)/.source +
                  classNamePrefix +
                  /(?:\w+|\*)(?=\s*;)/.source,
              ),
              lookbehind: true,
              alias: "static",
              inside: {
                namespace: className.inside.namespace,
                static: /\b\w+$/,
                punctuation: /\./,
                operator: /\*/,
                "class-name": /\w+/,
              },
            },
          ],
          namespace: {
            pattern: RegExp(
              /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(
                /<keyword>/g,
                function () {
                  return keywords.source;
                },
              ),
            ),
            lookbehind: true,
            inside: {
              punctuation: /\./,
            },
          },
        });
      })(Prism);

      /***/
    },

    /***/ 277: /***/ () => {
      // https://www.json.org/json-en.html
      Prism.languages.json = {
        property: {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
          lookbehind: true,
          greedy: true,
        },
        string: {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
          lookbehind: true,
          greedy: true,
        },
        comment: {
          pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true,
        },
        number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        punctuation: /[{}[\],]/,
        operator: /:/,
        boolean: /\b(?:false|true)\b/,
        null: {
          pattern: /\bnull\b/,
          alias: "keyword",
        },
      };

      Prism.languages.webmanifest = Prism.languages.json;

      /***/
    },

    /***/ 841: /***/ () => {
      Prism.languages.lua = {
        comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
        // \z may be used to skip the following space
        string: {
          pattern:
            /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
          greedy: true,
        },
        number:
          /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
        keyword:
          /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
        function: /(?!\d)\w+(?=\s*(?:[({]))/,
        operator: [
          /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
          {
            // Match ".." but don't break "..."
            pattern: /(^|[^.])\.\.(?!\.)/,
            lookbehind: true,
          },
        ],
        punctuation: /[\[\](){},;]|\.+|:+/,
      };

      /***/
    },

    /***/ 366: /***/ () => {
      Prism.languages.python = {
        comment: {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true,
          greedy: true,
        },
        "string-interpolation": {
          pattern:
            /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
          greedy: true,
          inside: {
            interpolation: {
              // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
              pattern:
                /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
              lookbehind: true,
              inside: {
                "format-spec": {
                  pattern: /(:)[^:(){}]+(?=\}$)/,
                  lookbehind: true,
                },
                "conversion-option": {
                  pattern: /![sra](?=[:}]$)/,
                  alias: "punctuation",
                },
                rest: null,
              },
            },
            string: /[\s\S]+/,
          },
        },
        "triple-quoted-string": {
          pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
          greedy: true,
          alias: "string",
        },
        string: {
          pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
          greedy: true,
        },
        function: {
          pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
          lookbehind: true,
        },
        "class-name": {
          pattern: /(\bclass\s+)\w+/i,
          lookbehind: true,
        },
        decorator: {
          pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
          lookbehind: true,
          alias: ["annotation", "punctuation"],
          inside: {
            punctuation: /\./,
          },
        },
        keyword:
          /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
        builtin:
          /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
        boolean: /\b(?:False|None|True)\b/,
        number:
          /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
        operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        punctuation: /[{}[\];(),.:]/,
      };

      Prism.languages.python["string-interpolation"].inside[
        "interpolation"
      ].inside.rest = Prism.languages.python;

      Prism.languages.py = Prism.languages.python;

      /***/
    },

    /***/ 865: /***/ () => {
      (function (Prism) {
        Prism.languages.sass = Prism.languages.extend("css", {
          // Sass comments don't need to be closed, only indented
          comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
            lookbehind: true,
            greedy: true,
          },
        });

        Prism.languages.insertBefore("sass", "atrule", {
          // We want to consume the whole line
          "atrule-line": {
            // Includes support for = and + shortcuts
            pattern: /^(?:[ \t]*)[@+=].+/m,
            greedy: true,
            inside: {
              atrule: /(?:@[\w-]+|[+=])/,
            },
          },
        });
        delete Prism.languages.sass.atrule;

        var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
        var operator = [
          /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
          {
            pattern: /(\s)-(?=\s)/,
            lookbehind: true,
          },
        ];

        Prism.languages.insertBefore("sass", "property", {
          // We want to consume the whole line
          "variable-line": {
            pattern: /^[ \t]*\$.+/m,
            greedy: true,
            inside: {
              punctuation: /:/,
              variable: variable,
              operator: operator,
            },
          },
          // We want to consume the whole line
          "property-line": {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
            greedy: true,
            inside: {
              property: [
                /[^:\s]+(?=\s*:)/,
                {
                  pattern: /(:)[^:\s]+/,
                  lookbehind: true,
                },
              ],
              punctuation: /:/,
              variable: variable,
              operator: operator,
              important: Prism.languages.sass.important,
            },
          },
        });
        delete Prism.languages.sass.property;
        delete Prism.languages.sass.important;

        // Now that whole lines for other patterns are consumed,
        // what's left should be selectors
        Prism.languages.insertBefore("sass", "punctuation", {
          selector: {
            pattern:
              /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
            lookbehind: true,
            greedy: true,
          },
        });
      })(Prism);

      /***/
    },

    /***/ 447: /***/ () => {
      Prism.languages.scss = Prism.languages.extend("css", {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: true,
        },
        atrule: {
          pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
          inside: {
            rule: /@[\w-]+/,
            // See rest below
          },
        },
        // url, compassified
        url: /(?:[-a-z]+-)?url(?=\()/i,
        // CSS selector regex is not appropriate for Sass
        // since there can be lot more things (var, @ directive, nesting..)
        // a selector must start at the end of a property or after a brace (end of other rules or nesting)
        // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
        // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
        // can "pass" as a selector- e.g: proper#{$erty})
        // this one was hard to do, so please be careful if you edit this one :)
        selector: {
          // Initial look-ahead is used to prevent matching of blank selectors
          pattern:
            /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
          inside: {
            parent: {
              pattern: /&/,
              alias: "important",
            },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
          },
        },
        property: {
          pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
          inside: {
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
          },
        },
      });

      Prism.languages.insertBefore("scss", "atrule", {
        keyword: [
          /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
          {
            pattern: /( )(?:from|through)(?= )/,
            lookbehind: true,
          },
        ],
      });

      Prism.languages.insertBefore("scss", "important", {
        // var and interpolated vars
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
      });

      Prism.languages.insertBefore("scss", "function", {
        "module-modifier": {
          pattern: /\b(?:as|hide|show|with)\b/i,
          alias: "keyword",
        },
        placeholder: {
          pattern: /%[-\w]+/,
          alias: "selector",
        },
        statement: {
          pattern: /\B!(?:default|optional)\b/i,
          alias: "keyword",
        },
        boolean: /\b(?:false|true)\b/,
        null: {
          pattern: /\bnull\b/,
          alias: "keyword",
        },
        operator: {
          pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
          lookbehind: true,
        },
      });

      Prism.languages.scss["atrule"].inside.rest = Prism.languages.scss;

      /***/
    },

    /***/ 836: /***/ () => {
      (function (Prism) {
        Prism.languages.typescript = Prism.languages.extend("javascript", {
          "class-name": {
            pattern:
              /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: true,
            greedy: true,
            inside: null, // see below
          },
          builtin:
            /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
        });

        // The keywords TypeScript adds to JavaScript
        Prism.languages.typescript.keyword.push(
          /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
          // keywords that have to be followed by an identifier
          /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
          // This is for `import type *, {}`
          /\btype\b(?=\s*(?:[\{*]|$))/,
        );

        // doesn't work with TS because TS is too complex
        delete Prism.languages.typescript["parameter"];
        delete Prism.languages.typescript["literal-property"];

        // a version of typescript specifically for highlighting types
        var typeInside = Prism.languages.extend("typescript", {});
        delete typeInside["class-name"];

        Prism.languages.typescript["class-name"].inside = typeInside;

        Prism.languages.insertBefore("typescript", "function", {
          decorator: {
            pattern: /@[$\w\xA0-\uFFFF]+/,
            inside: {
              at: {
                pattern: /^@/,
                alias: "operator",
              },
              function: /^[\s\S]+/,
            },
          },
          "generic-function": {
            // e.g. foo<T extends "bar" | "baz">( ...
            pattern:
              /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
            greedy: true,
            inside: {
              function:
                /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
              generic: {
                pattern: /<[\s\S]+/, // everything after the first <
                alias: "class-name",
                inside: typeInside,
              },
            },
          },
        });

        Prism.languages.ts = Prism.languages.typescript;
      })(Prism);

      /***/
    },

    /***/ 660: /***/ (
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) => {
      /* **********************************************
     Begin prism-core.js
********************************************** */

      /// <reference lib="WebWorker"/>

      var _self =
        typeof window !== "undefined"
          ? window // if in browser
          : typeof WorkerGlobalScope !== "undefined" &&
              self instanceof WorkerGlobalScope
            ? self // if in worker
            : {}; // if in node js

      /**
       * Prism: Lightweight, robust, elegant syntax highlighting
       *
       * @license MIT <https://opensource.org/licenses/MIT>
       * @author Lea Verou <https://lea.verou.me>
       * @namespace
       * @public
       */
      var Prism = (function (_self) {
        // Private helper vars
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;

        // The grammar object for plaintext
        var plainTextGrammar = {};

        var _ = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self.Prism && _self.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler:
            _self.Prism && _self.Prism.disableWorkerMessageHandler,

          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(
                  tokens.type,
                  encode(tokens.content),
                  tokens.alias,
                );
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
              }
            },

            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function (o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },

            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function (obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },

            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};

              var clone;
              var id;
              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = /** @type {Record<string, any>} */ ({});
                  visited[id] = clone;

                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }

                  return /** @type {any} */ (clone);

                case "Array":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;

                  /** @type {Array} */ (/** @type {any} */ (o)).forEach(
                    function (v, i) {
                      clone[i] = deepClone(v, visited);
                    },
                  );

                  return /** @type {any} */ (clone);

                default:
                  return o;
              }
            },

            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function (element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },

            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function (element, language) {
              // remove all `language-xxxx` classes
              // (this might leave behind a leading space)
              element.className = element.className.replace(
                RegExp(lang, "gi"),
                "",
              );

              // add the new `language-xxxx` class
              // (using `classList` will automatically clean up spaces for us)
              element.classList.add("language-" + language);
            },

            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function () {
              if (typeof document === "undefined") {
                return null;
              }
              if (
                "currentScript" in document &&
                1 < 2 /* hack to trip TS' flow analysis */
              ) {
                return /** @type {any} */ (document.currentScript);
              }

              // IE11 workaround
              // we'll get the src of the current script by parsing IE11's error stack trace
              // this will not work for inline scripts

              try {
                throw new Error();
              } catch (err) {
                // Get file src url from stack. Specifically works with the format of stack traces in IE.
                // A stack will look like this:
                //
                // Error
                //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                //    at Global code (http://localhost/components/prism-core.js:606:1)

                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
                  err.stack,
                ) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },

            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function (element, className, defaultActivation) {
              var no = "no-" + className;

              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            },
          },

          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,

            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function (id, redef) {
              var lang = _.util.clone(_.languages[id]);

              for (var key in redef) {
                lang[key] = redef[key];
              }

              return lang;
            },

            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function (inside, before, insert, root) {
              root = root || /** @type {any} */ (_.languages);
              var grammar = root[inside];
              /** @type {Grammar} */
              var ret = {};

              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }

                  // Do not insert token which also occur in insert. See #1525
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }

              var old = root[inside];
              root[inside] = ret;

              // Update references in other language definitions
              _.languages.DFS(_.languages, function (key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });

              return ret;
            },

            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};

              var objId = _.util.objId;

              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);

                  var property = o[i];
                  var propertyType = _.util.type(property);

                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (
                    propertyType === "Array" &&
                    !visited[objId(property)]
                  ) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            },
          },

          plugins: {},

          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function (async, callback) {
            _.highlightAllUnder(document, async, callback);
          },

          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function (container, async, callback) {
            var env = {
              callback: callback,
              container: container,
              selector:
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
            };

            _.hooks.run("before-highlightall", env);

            env.elements = Array.prototype.slice.apply(
              env.container.querySelectorAll(env.selector),
            );

            _.hooks.run("before-all-elements-highlight", env);

            for (var i = 0, element; (element = env.elements[i++]); ) {
              _.highlightElement(element, async === true, env.callback);
            }
          },

          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function (element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];

            // Set language on the element, if not present
            _.util.setLanguage(element, language);

            // Set language on the parent, for styling
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _.util.setLanguage(parent, language);
            }

            var code = element.textContent;

            var env = {
              element: element,
              language: language,
              grammar: grammar,
              code: code,
            };

            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;

              _.hooks.run("before-insert", env);

              env.element.innerHTML = env.highlightedCode;

              _.hooks.run("after-highlight", env);
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
            }

            _.hooks.run("before-sanity-check", env);

            // plugins may change/add the parent/element
            parent = env.element.parentElement;
            if (
              parent &&
              parent.nodeName.toLowerCase() === "pre" &&
              !parent.hasAttribute("tabindex")
            ) {
              parent.setAttribute("tabindex", "0");
            }

            if (!env.code) {
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }

            _.hooks.run("before-highlight", env);

            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }

            if (async && _self.Worker) {
              var worker = new Worker(_.filename);

              worker.onmessage = function (evt) {
                insertHighlightedCode(evt.data);
              };

              worker.postMessage(
                JSON.stringify({
                  language: env.language,
                  code: env.code,
                  immediateClose: true,
                }),
              );
            } else {
              insertHighlightedCode(
                _.highlight(env.code, env.grammar, env.language),
              );
            }
          },

          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function (text, grammar, language) {
            var env = {
              code: text,
              grammar: grammar,
              language: language,
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error(
                'The language "' + env.language + '" has no grammar.',
              );
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },

          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function (text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }

              delete grammar.rest;
            }

            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);

            matchGrammar(text, tokenList, grammar, tokenList.head, 0);

            return toArray(tokenList);
          },

          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},

            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function (name, callback) {
              var hooks = _.hooks.all;

              hooks[name] = hooks[name] || [];

              hooks[name].push(callback);
            },

            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function (name, env) {
              var callbacks = _.hooks.all[name];

              if (!callbacks || !callbacks.length) {
                return;
              }

              for (var i = 0, callback; (callback = callbacks[i++]); ) {
                callback(env);
              }
            },
          },

          Token: Token,
        };
        _self.Prism = _;

        // Typescript note:
        // The following can be used to import the Token type in JSDoc:
        //
        //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

        /**
         * Creates a new token.
         *
         * @param {string} type See {@link Token#type type}
         * @param {string | TokenStream} content See {@link Token#content content}
         * @param {string|string[]} [alias] The alias(es) of the token.
         * @param {string} [matchedStr=""] A copy of the full string this token was created from.
         * @class
         * @global
         * @public
         */
        function Token(type, content, alias, matchedStr) {
          /**
           * The type of the token.
           *
           * This is usually the key of a pattern in a {@link Grammar}.
           *
           * @type {string}
           * @see GrammarToken
           * @public
           */
          this.type = type;
          /**
           * The strings or tokens contained by this token.
           *
           * This will be a token stream if the pattern matched also defined an `inside` grammar.
           *
           * @type {string | TokenStream}
           * @public
           */
          this.content = content;
          /**
           * The alias(es) of the token.
           *
           * @type {string|string[]}
           * @see GrammarToken
           * @public
           */
          this.alias = alias;
          // Copy of the full string this token was created from
          this.length = (matchedStr || "").length | 0;
        }

        /**
         * A token stream is an array of strings and {@link Token Token} objects.
         *
         * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
         * them.
         *
         * 1. No adjacent strings.
         * 2. No empty strings.
         *
         *    The only exception here is the token stream that only contains the empty string and nothing else.
         *
         * @typedef {Array<string | Token>} TokenStream
         * @global
         * @public
         */

        /**
         * Converts the given token or token stream to an HTML representation.
         *
         * The following hooks will be run:
         * 1. `wrap`: On each {@link Token}.
         *
         * @param {string | Token | TokenStream} o The token or token stream to be converted.
         * @param {string} language The name of current language.
         * @returns {string} The HTML representation of the token or token stream.
         * @memberof Token
         * @static
         */
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function (e) {
              s += stringify(e, language);
            });
            return s;
          }

          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language: language,
          };

          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }

          _.hooks.run("wrap", env);

          var attributes = "";
          for (var name in env.attributes) {
            attributes +=
              " " +
              name +
              '="' +
              (env.attributes[name] || "").replace(/"/g, "&quot;") +
              '"';
          }

          return (
            "<" +
            env.tag +
            ' class="' +
            env.classes.join(" ") +
            '"' +
            attributes +
            ">" +
            env.content +
            "</" +
            env.tag +
            ">"
          );
        };

        /**
         * @param {RegExp} pattern
         * @param {number} pos
         * @param {string} text
         * @param {boolean} lookbehind
         * @returns {RegExpExecArray | null}
         */
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }

        /**
         * @param {string} text
         * @param {LinkedList<string | Token>} tokenList
         * @param {any} grammar
         * @param {LinkedListNode<string | Token>} startNode
         * @param {number} startPos
         * @param {RematchOptions} [rematch]
         * @returns {void}
         * @private
         *
         * @typedef RematchOptions
         * @property {string} cause
         * @property {number} reach
         */
        function matchGrammar(
          text,
          tokenList,
          grammar,
          startNode,
          startPos,
          rematch,
        ) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }

            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }

              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;

              if (greedy && !patternObj.pattern.global) {
                // Without the global flag, lastIndex won't work
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(
                  patternObj.pattern.source,
                  flags + "g",
                );
              }

              /** @type {RegExp} */
              var pattern = patternObj.pattern || patternObj;

              for (
                // iterate the token list and keep track of the current token/string position
                var currentNode = startNode.next, pos = startPos;
                currentNode !== tokenList.tail;
                pos += currentNode.value.length, currentNode = currentNode.next
              ) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }

                var str = currentNode.value;

                if (tokenList.length > text.length) {
                  // Something went terribly wrong, ABORT, ABORT!
                  return;
                }

                if (str instanceof Token) {
                  continue;
                }

                var removeCount = 1; // this is the to parameter of removeBetween
                var match;

                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }

                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;

                  // find the node that contains the match
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  // adjust pos (and p)
                  p -= currentNode.value.length;
                  pos = p;

                  // the current node is a Token, then the match starts inside another Token, which is invalid
                  if (currentNode.value instanceof Token) {
                    continue;
                  }

                  // find the last node which is affected by this match
                  for (
                    var k = currentNode;
                    k !== tokenList.tail &&
                    (p < to || typeof k.value === "string");
                    k = k.next
                  ) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;

                  // replace with the new match
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }

                // eslint-disable-next-line no-redeclare
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);

                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }

                var removeFrom = currentNode.prev;

                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }

                removeRange(tokenList, removeFrom, removeCount);

                var wrapped = new Token(
                  token,
                  inside ? _.tokenize(matchStr, inside) : matchStr,
                  alias,
                  matchStr,
                );
                currentNode = addAfter(tokenList, removeFrom, wrapped);

                if (after) {
                  addAfter(tokenList, currentNode, after);
                }

                if (removeCount > 1) {
                  // at least one Token object was removed, so we have to do some rematching
                  // this can only happen if the current pattern is greedy

                  /** @type {RematchOptions} */
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach: reach,
                  };
                  matchGrammar(
                    text,
                    tokenList,
                    grammar,
                    currentNode.prev,
                    pos,
                    nestedRematch,
                  );

                  // the reach might have been extended because of the rematching
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }

        /**
         * @typedef LinkedListNode
         * @property {T} value
         * @property {LinkedListNode<T> | null} prev The previous node.
         * @property {LinkedListNode<T> | null} next The next node.
         * @template T
         * @private
         */

        /**
         * @template T
         * @private
         */
        function LinkedList() {
          /** @type {LinkedListNode<T>} */
          var head = { value: null, prev: null, next: null };
          /** @type {LinkedListNode<T>} */
          var tail = { value: null, prev: head, next: null };
          head.next = tail;

          /** @type {LinkedListNode<T>} */
          this.head = head;
          /** @type {LinkedListNode<T>} */
          this.tail = tail;
          this.length = 0;
        }

        /**
         * Adds a new node with the given value to the list.
         *
         * @param {LinkedList<T>} list
         * @param {LinkedListNode<T>} node
         * @param {T} value
         * @returns {LinkedListNode<T>} The added node.
         * @template T
         */
        function addAfter(list, node, value) {
          // assumes that node != list.tail && values.length >= 0
          var next = node.next;

          var newNode = { value: value, prev: node, next: next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;

          return newNode;
        }
        /**
         * Removes `count` nodes after the given node. The given node will not be removed.
         *
         * @param {LinkedList<T>} list
         * @param {LinkedListNode<T>} node
         * @param {number} count
         * @template T
         */
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        /**
         * @param {LinkedList<T>} list
         * @returns {T[]}
         * @template T
         */
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }

        if (!_self.document) {
          if (!_self.addEventListener) {
            // in Node.js
            return _;
          }

          if (!_.disableWorkerMessageHandler) {
            // In worker
            _self.addEventListener(
              "message",
              function (evt) {
                var message = JSON.parse(evt.data);
                var lang = message.language;
                var code = message.code;
                var immediateClose = message.immediateClose;

                _self.postMessage(_.highlight(code, _.languages[lang], lang));
                if (immediateClose) {
                  _self.close();
                }
              },
              false,
            );
          }

          return _;
        }

        // Get current script and highlight
        var script = _.util.currentScript();

        if (script) {
          _.filename = script.src;

          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }

        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }

        if (!_.manual) {
          // If the document state is "loading", then we'll use DOMContentLoaded.
          // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
          // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
          // might take longer one animation frame to execute which can create a race condition where only some plugins have
          // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
          // See https://github.com/PrismJS/prism/issues/2102
          var readyState = document.readyState;
          if (
            readyState === "loading" ||
            (readyState === "interactive" && script && script.defer)
          ) {
            document.addEventListener(
              "DOMContentLoaded",
              highlightAutomaticallyCallback,
            );
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }

        return _;
      })(_self);

      if (true && module.exports) {
        module.exports = Prism;
      }

      // hack for components to work correctly in node.js
      if (typeof __webpack_require__.g !== "undefined") {
        __webpack_require__.g.Prism = Prism;
      }

      // some additional documentation/types

      /**
       * The expansion of a simple `RegExp` literal to support additional properties.
       *
       * @typedef GrammarToken
       * @property {RegExp} pattern The regular expression of the token.
       * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
       * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
       * @property {boolean} [greedy=false] Whether the token is greedy.
       * @property {string|string[]} [alias] An optional alias or list of aliases.
       * @property {Grammar} [inside] The nested grammar of this token.
       *
       * The `inside` grammar will be used to tokenize the text value of each token of this kind.
       *
       * This can be used to make nested and even recursive language definitions.
       *
       * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
       * each another.
       * @global
       * @public
       */

      /**
       * @typedef Grammar
       * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
       * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
       * @global
       * @public
       */

      /**
       * A function which will invoked after an element was successfully highlighted.
       *
       * @callback HighlightCallback
       * @param {Element} element The element successfully highlighted.
       * @returns {void}
       * @global
       * @public
       */

      /**
       * @callback HookCallback
       * @param {Object<string, any>} env The environment variables of the hook.
       * @returns {void}
       * @global
       * @public
       */

      /* **********************************************
     Begin prism-markup.js
********************************************** */

      Prism.languages.markup = {
        comment: {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true,
        },
        prolog: {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true,
        },
        doctype: {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern:
            /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null, // see below
            },
            string: {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true,
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            name: /[^\s<>'"]+/,
          },
        },
        cdata: {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true,
        },
        tag: {
          pattern:
            /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            tag: {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                punctuation: /^<\/?/,
                namespace: /^[^\s>\/:]+:/,
              },
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals",
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true,
                  },
                ],
              },
            },
            punctuation: /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                namespace: /^[^\s>\/:]+:/,
              },
            },
          },
        },
        entity: [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity",
          },
          /&#x?[\da-f]{1,8};/i,
        ],
      };

      Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] =
        Prism.languages.markup["entity"];
      Prism.languages.markup["doctype"].inside["internal-subset"].inside =
        Prism.languages.markup;

      // Plugin to make entity title show the real entity, idea by Roman Komarov
      Prism.hooks.add("wrap", function (env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });

      Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang],
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;

          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside,
            },
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang],
          };

          var def = {};
          def[tagName] = {
            pattern: RegExp(
              /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                /__/g,
                function () {
                  return tagName;
                },
              ),
              "i",
            ),
            lookbehind: true,
            greedy: true,
            inside: inside,
          };

          Prism.languages.insertBefore("markup", "cdata", def);
        },
      });
      Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function (attrName, lang) {
          Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source +
                "(?:" +
                attrName +
                ")" +
                /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i",
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  value: {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism.languages[lang],
                  },
                  punctuation: [
                    {
                      pattern: /^=/,
                      alias: "attr-equals",
                    },
                    /"|'/,
                  ],
                },
              },
            },
          });
        },
      });

      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;

      Prism.languages.xml = Prism.languages.extend("markup", {});
      Prism.languages.ssml = Prism.languages.xml;
      Prism.languages.atom = Prism.languages.xml;
      Prism.languages.rss = Prism.languages.xml;

      /* **********************************************
     Begin prism-css.js
********************************************** */

      (function (Prism) {
        var string =
          /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

        Prism.languages.css = {
          comment: /\/\*[\s\S]*?\*\//,
          atrule: {
            pattern: RegExp(
              "@[\\w-](?:" +
                /[^;{\s"']|\s+(?!\s)/.source +
                "|" +
                string.source +
                ")*?" +
                /(?:;|(?=\s*\{))/.source,
            ),
            inside: {
              rule: /^@[\w-]+/,
              "selector-function-argument": {
                pattern:
                  /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector",
              },
              keyword: {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true,
              },
              // See rest below
            },
          },
          url: {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp(
              "\\burl\\((?:" +
                string.source +
                "|" +
                /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                ")\\)",
              "i",
            ),
            greedy: true,
            inside: {
              function: /^url/i,
              punctuation: /^\(|\)$/,
              string: {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url",
              },
            },
          },
          selector: {
            pattern: RegExp(
              "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
                string.source +
                ")*(?=\\s*\\{)",
            ),
            lookbehind: true,
          },
          string: {
            pattern: string,
            greedy: true,
          },
          property: {
            pattern:
              /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true,
          },
          important: /!important\b/i,
          function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true,
          },
          punctuation: /[(){};:,]/,
        };

        Prism.languages.css["atrule"].inside.rest = Prism.languages.css;

        var markup = Prism.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism);

      /* **********************************************
     Begin prism-clike.js
********************************************** */

      Prism.languages.clike = {
        comment: [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true,
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true,
          },
        ],
        string: {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true,
        },
        "class-name": {
          pattern:
            /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            punctuation: /[.\\]/,
          },
        },
        keyword:
          /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        boolean: /\b(?:false|true)\b/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/,
      };

      /* **********************************************
     Begin prism-javascript.js
********************************************** */

      Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
          Prism.languages.clike["class-name"],
          {
            pattern:
              /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true,
          },
        ],
        keyword: [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true,
          },
          {
            pattern:
              /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true,
          },
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        function:
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: {
          pattern: RegExp(
            /(^|[^\w$])/.source +
              "(?:" +
              // constant
              (/NaN|Infinity/.source +
                "|" +
                // binary integer
                /0[bB][01]+(?:_[01]+)*n?/.source +
                "|" +
                // octal integer
                /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
                "|" +
                // hexadecimal integer
                /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
                "|" +
                // decimal bigint
                /\d+(?:_\d+)*n/.source +
                "|" +
                // decimal number (integer or float) but no bigint
                /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
                  .source) +
              ")" +
              /(?![\w$])/.source,
          ),
          lookbehind: true,
        },
        operator:
          /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
      });

      Prism.languages.javascript["class-name"][0].pattern =
        /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

      Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
              // Regex pattern:
              // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
              // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
              // with the only syntax, so we have to define 2 different regex patterns.
              /\//.source +
              "(?:" +
              /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/
                .source +
              "|" +
              // `v` flag syntax. This supports 3 levels of nested character classes.
              /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/
                .source +
              ")" +
              // lookahead
              /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
                .source,
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism.languages.regex,
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/,
          },
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function",
        },
        parameter: [
          {
            pattern:
              /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript,
          },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
      });

      Prism.languages.insertBefore("javascript", "string", {
        hashbang: {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment",
        },
        "template-string": {
          pattern:
            /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string",
            },
            interpolation: {
              pattern:
                /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation",
                },
                rest: Prism.languages.javascript,
              },
            },
            string: /[\s\S]+/,
          },
        },
        "string-property": {
          pattern:
            /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property",
        },
      });

      Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern:
            /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property",
        },
      });

      if (Prism.languages.markup) {
        Prism.languages.markup.tag.addInlined("script", "javascript");

        // add attribute support for all DOM events.
        // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
        Prism.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
            .source,
          "javascript",
        );
      }

      Prism.languages.js = Prism.languages.javascript;

      /* **********************************************
     Begin prism-file-highlight.js
********************************************** */

      (function () {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
        if (!Element.prototype.matches) {
          Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
        }

        var LOADING_MESSAGE = "Loading…";
        var FAILURE_MESSAGE = function (status, message) {
          return "✖ Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "✖ Error: File does not exist or is empty";

        var EXTENSIONS = {
          js: "javascript",
          py: "python",
          rb: "ruby",
          ps1: "powershell",
          psm1: "powershell",
          sh: "bash",
          bat: "batch",
          h: "c",
          tex: "latex",
        };

        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";

        var SELECTOR =
          "pre[data-src]:not([" +
          STATUS_ATTR +
          '="' +
          STATUS_LOADED +
          '"])' +
          ":not([" +
          STATUS_ATTR +
          '="' +
          STATUS_LOADING +
          '"])';

        /**
         * Loads the given file.
         *
         * @param {string} src The URL or path of the source file to load.
         * @param {(result: string) => void} success
         * @param {(reason: string) => void} error
         */
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }

        /**
         * Parses the given range.
         *
         * This returns a range with inclusive ends.
         *
         * @param {string | null | undefined} range
         * @returns {[number, number | undefined] | undefined}
         */
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];

            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, undefined];
            }
            return [start, Number(end)];
          }
          return undefined;
        }

        Prism.hooks.add("before-highlightall", function (env) {
          env.selector += ", " + SELECTOR;
        });

        Prism.hooks.add("before-sanity-check", function (env) {
          var pre = /** @type {HTMLPreElement} */ (env.element);
          if (pre.matches(SELECTOR)) {
            env.code = ""; // fast-path the whole thing and go to complete

            pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

            // add code element with loading message
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;

            var src = pre.getAttribute("data-src");

            var language = env.language;
            if (language === "none") {
              // the language might be 'none' because there is no language set;
              // in this case, we want to use the extension as the language
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }

            // set language classes
            Prism.util.setLanguage(code, language);
            Prism.util.setLanguage(pre, language);

            // preload the language
            var autoloader = Prism.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }

            // load file
            loadFile(
              src,
              function (text) {
                // mark as loaded
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

                // handle data-range
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);

                  // the range is one-based and inclusive on both ends
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];

                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));

                  text = lines.slice(start, end).join("\n");

                  // add data-start for line numbers
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }

                // highlight code
                code.textContent = text;
                Prism.highlightElement(code);
              },
              function (error) {
                // mark as failed
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

                code.textContent = error;
              },
            );
          }
        });

        Prism.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);

            for (var i = 0, element; (element = elements[i++]); ) {
              Prism.highlightElement(element);
            }
          },
        };

        var logged = false;
        /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
        Prism.fileHighlight = function () {
          if (!logged) {
            console.warn(
              "Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.",
            );
            logged = true;
          }
          Prism.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();

      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/ (() => {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === "object") return globalThis;
      /******/ try {
        /******/ return this || new Function("return this")();
        /******/
      } catch (e) {
        /******/ if (typeof window === "object") return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";

    // EXTERNAL MODULE: ./node_modules/prismjs/prism.js
    var prism = __webpack_require__(660);
    var prism_default = /*#__PURE__*/ __webpack_require__.n(prism);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-json.js
    var prism_json = __webpack_require__(277);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-python.js
    var prism_python = __webpack_require__(366);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-typescript.js
    var prism_typescript = __webpack_require__(836);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-sass.js
    var prism_sass = __webpack_require__(865);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-scss.js
    var prism_scss = __webpack_require__(447);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-java.js
    var prism_java = __webpack_require__(503);
    // EXTERNAL MODULE: ./node_modules/prismjs/components/prism-lua.js
    var prism_lua = __webpack_require__(841); // CONCATENATED MODULE: ./src/scripts/ui/typewriter.js
    // Note **
    // typingTimeouts: prevents overlapping typewriting on the same element
    // specific to myTextTypewriter as several elements involving text can trigger multiple timeouts -- this prevents it
    //

    const typingTimeouts = new Map();
    const cursor = " ●";

    function myCodeTypewriter(el, content, lang) {
      const langDefault = prism_default().languages.javascript;
      let i = 0;

      function typeChar() {
        if (i < content.length) {
          el.textContent = content.substring(0, i + 1) + cursor;
          i++;
          setTimeout(typeChar, 25);
        } else {
          el.textContent = content;
        }
        el.innerHTML = prism_default().highlight(
          el.textContent,
          prism_default().languages[lang] || langDefault,
        );
      }
      typeChar();
    }

    function myTextTypewriter(el, content) {
      let i = 0;
      clearTimeout(typingTimeouts.get(el));

      function typeChar() {
        if (i < content.length) {
          el.textContent = content.substring(0, i + 1) + cursor;
          i++;
          typingTimeouts.set(el, setTimeout(typeChar, 35));
        } else {
          el.textContent = content;
          typingTimeouts.delete(el);
        }
      }
      typeChar();
    } // CONCATENATED MODULE: ./src/scripts/ui/bottomToolbar.js

    function printBottomToolbarMessage(message) {
      const bottomBarLabel = document.querySelector("#js-toolbar-message");
      myTextTypewriter(bottomBarLabel, message);
    } // CONCATENATED MODULE: ./src/scripts/ui/theme.js

    const root = document.documentElement;
    const themeButton = document.querySelector("#js-theme-btn");

    function applySavedTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        root.classList.toggle("dark", savedTheme === "dark");
      }
    }

    themeButton.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        root.classList.contains("dark") ? "dark" : "light",
      );
      printBottomToolbarMessage("Switched theme mode...");
    }); // CONCATENATED MODULE: ./src/scripts/ui/messageAnimation.js

    function triggerSlideInAnimation(className) {
      const slideInElements = document.querySelectorAll(className);

      slideInElements.forEach((elem) => {
        elem.classList.remove("animate-slide-in");
        void elem.offsetWidth;
        elem.classList.add("animate-slide-in");
      });
    } // CONCATENATED MODULE: ./src/scripts/chat/chatScroll.js

    const chatContainer = document.querySelector("#js-chat");
    chatContainer.addEventListener("scroll", autoScrollCancel);

    let scrollingInterval;
    let previousScrollTop = chatContainer.scrollTop;

    function clearScrollInterval() {
      if (scrollingInterval) {
        clearInterval(scrollingInterval);
      }
    }

    function autoScrollToBottom() {
      clearScrollInterval();
      scrollingInterval = setInterval(() => {
        chatContainer.lastElementChild.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }, 1000);
    }

    function autoScrollCancel() {
      let currentScrollTop = chatContainer.scrollTop;
      // scrolling up causes scrollTop value to decrease
      // (scrollTop represents how much the element is being scrolled vertically)
      if (currentScrollTop < previousScrollTop) {
        clearScrollInterval();
      }
      previousScrollTop = currentScrollTop; // new scroll value
    } // CONCATENATED MODULE: ./src/data/defaultMessages.json

    const defaultMessages_namespaceObject = JSON.parse(
      '{"refactor":{"do":"Explain any specific code improvement that you are looking for, such as, performance, readability, etc. Otherwise, drop your code snippet for a general assessment.","dont":"Avoid sending code that isn\'t related to the issue. Type \'Disclaimer\' to the chat for additional limitations."},"explain":{"do":"Ask a coding-related questions for an explanation or provide a code snippet to get a concise explanation.","dont":"Overly general questions get overly general responses so be concise but specific!"},"debug":{"do":"Briefly explain the problem, provide any error messages. Otherwise, drop your code snippet for a general assessment.","dont":"Avoid sending code that isn\'t related to the issue. Type \'Disclaimer\' to the chat for additional limitations."},"convert":{"do":"Clearly state the language you would like your code snippet converted into. Provide context if necessary to understand how the code operates.","dont":"Refrain from submitting overly lengthy code snippets. Run the code through the \'Debug\' option before submitting to ensure that the snippet doesn\'t convert with any pre-existing bugs."}}',
    ); // CONCATENATED MODULE: ./src/scripts/chat/defaultMessages.js
    const messageDosEl = document.querySelector("#js-message--dos");
    const messageDontsEl = document.querySelector("#js-message--donts");

    function typeDefaultMessages(option = "explain") {
      clearInstructions();
      myTextTypewriter(
        messageDosEl,
        defaultMessages_namespaceObject[option].do,
      );
      myTextTypewriter(
        messageDontsEl,
        defaultMessages_namespaceObject[option].dont,
      );
    }

    function clearInstructions() {
      const messageEl = [messageDosEl, messageDontsEl];
      messageEl.forEach((el) => {
        el.textContent = "";
      });
    } // CONCATENATED MODULE: ./src/scripts/ui/radioButtons.js

    const storedOptionType = localStorage.getItem("optionType");
    const radioFieldset = document.querySelector("#js-radio-fieldset");

    radioFieldset.addEventListener("change", (event) => {
      const option = event.target.value;

      triggerSlideInAnimation(".js-message"); // targets all chat elements
      typeDefaultMessages(option); // prints option-specific info
      autoScrollToBottom();
      printBottomToolbarMessage(`Switched to ${option} chat...`);

      localStorage.setItem("optionType", option);
    });

    function applyRadioOption() {
      if (storedOptionType) {
        const storedEl = document.querySelector(
          `#js-radio-${storedOptionType}`,
        );
        storedEl.checked = true;

        typeDefaultMessages(storedOptionType);
      }
    } // CONCATENATED MODULE: ./src/data/chatCommands.json

    const chatCommands_namespaceObject = JSON.parse(
      '{"help":"<p>Type the following prompts for more information or guidance:</p><ul><span>General commands:</span><li><span>disclaimer</span>: note about the website and its limitations</li><li><span>creator</span>: learn more about the creator</li><li><span>repo</span>: get the github repository link</li><li><span>features</span>: see a full list of features</li><li><span>tech</span>: stack used to build this website</li><li><span>example</span>: see an example of a prompt and response</li><li><span>theme</span>: switch theme mode</li><li><span>ai</span>: print the ai model being utilized</li><li><span>copy</span>: copy the last ai-generated code block in the chat</li><li><span>save</span>: save the chat to workspace</li><li><span>download</span>: download the contents of the current chat</li><li><span>clear</span>: clear the chat from workspace</li><span>Switch chat type:</span><li><span>explain</span>: switch to the code explanations chat</li><li><span>refactor</span>: switch to the code refactoring chat</li><li><span>debug</span>: switch to the code debugging chat</li><li><span>convert</span>: switch to the code conversion chat</li></ul>","creator":"<p>Follow my work:</p><ul><li><a target=\\"_blank\\" href=\\"https://aniqa.dev\\"><i class=\\"fa-regular fa-address-card\\"></i> aniqa.dev</a></li><li><a target=\\"_blank\\" href=\\"https://github.com/aniqatc\\"><i class=\\"fa-brands fa-github\\"></i> github.com/aniqatc</a></li><li><a target=\\"_blank\\" href=\\"https://twitter.com/aniqatc\\"><i class=\\"fa-brands fa-x-twitter\\"></i> twitter.com/aniqatc</a></li><li><a target=\\"_blank\\" href=\\"https://codepen.com/aniqatc\\"><i class=\\"fa-brands fa-codepen\\"></i> codepen.com/aniqatc</a></li></ul>","repo":"<a target=\\"_blank\\" href=\\"https://github.com/aniqatc/ai-assistant\\">github.com/aniqatc/ai-assistant</a>","example":"<p>User Prompt:</p><div class=\\"js-message js-message--user text-slate-500 dark:text-slate-300\\">Explain how I can find the highest number in an array with JavaScript</div><br/><p>AI-Generated Response:</p><div class=\\"js-response pb-2 \\">To calculate the maximum number in an array in JavaScript, you can use the Math.max method along with the spread operator (...).</div><pre data-lang=\\"javascript\\" class=\\"pb-2 js-message  py-1\\"><span class=\\"token keyword\\">const</span> numbers <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">8</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> maxNumber <span class=\\"token operator\\">=</span> Math<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">max</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">...</span>numbers<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></pre><div class=\\"js-response py-1 \\">In this example, we have an array of numbers [1, 5, 2, 10, 8]. By using Math.max and spreading the numbers array using the spread operator (...), we can find the maximum number in the array. The result will be stored in the maxNumber variable. In this case, maxNumber will be 10.</div>","debug":"Entered code debugging chat...","refactor":"Entered code refactoring chat...","explain":"Entered code explanation chat...","convert":"Entered code conversion chat...","save":"Saved chat to workspace...","clear":"","copy":"Copied the last printed code block...","theme":"Switched theme mode...","ai":"<p>ChatGPT-3.5-turbo model accessed through SheCodes API</p>","tech":"<ul>\\n\\t\\t<li><i class=\\"fa-solid fa-cube\\"></i> Webpack</li>\\n\\t\\t<li><i class=\\"fa-solid fa-dice-d20\\"></i> GPT3.5</li>\\n\\t\\t<li><i class=\\"fa-solid fa-play -rotate-90\\"></i> Prism</li>\\n\\t\\t<li><i class=\\"fa-brands fa-js\\"></i> JavaScript</li>\\n\\t\\t<li><i class=\\"fa-solid fa-wind\\"></i> Tailwind</li>\\n\\t\\t<li><i class=\\"fa-brands fa-html5\\"></i> HTML</li>\\n\\t</ul>\\n","disclaimer":"<p>While I\'ve streamlined the process to make getting coding assistance fast (by selecting one of the predefined options) - there are still some important limitations to be aware of:</p><ul><li><span>● Character Limit</span>: The AI chat has a maximum capacity of <strong>700 characters</strong> per submission. I advise you to select your words carefully to make the most of this limit.</li><li><span>● Handling Complex Issues</span>: For more intricate coding challenges, I recommend dividing your code into smaller segments and interacting with the chat step by step. Alternatively, you may choose to use <a href=\\"https://chat.openai.com/\\" target=\\"_blank\\">ChatGPT</a> directly for more extensive assistance.</li><li><span>● Adherence to Guidelines</span>: For an optimal experience, please ensure you follow the specific guidelines provided for each assistance option.</li><li><span>● Limited testing</span>: The chat has only been manually tested with popular languages (e.g. JavaScript, CSS/SASS, Typescript, Python, Java, Lua) and some random ones like COBOL and Haskell. It has worked as expected (so far). </li></ul><p>By understanding and working within these parameters, you\'ll achieve the best results from this simple AI coding assistant. Happy coding!</p>","download":"Downloaded the current chat history...","features":"<p>Currently supported by this application:</p><ul><li>→ <span>Diverse prompt options</span> to streamline code assistance process</li><li>→ <span>Built-in commands</span> in the chat system for additional guidance</li><li>→ <span>ChatGPT</span> AI model utilized</li><li>→ <span>Hassle-free code submission with automatic encoding</span> before sent to API for response</li><li>→ <span>Prism.js syntax highlighting</span> for all the popular languages</li><li>→ <span>Personalized experience</span> by utilizing localStorage to save chat history and additional user preferences</li><li>→ <span>Download chat history</span> to an HTML file that is formatted for printing</li><li>→ <span>Progressive Web App (PWA)</span> to use as a native application</li><li>→ <span>Response time calculated</span> to keep track of AI response performance</li><li>→ <span>Responsive on all devices screens</span></li><li>→ <span>Light & dark mode</span></li><li>→ <span>Convenient toolbar</span> for quick copying, saving, deleting, and downloading</li></ul><span>For a full breakdown of features, check out the project\'s <a href=\\"https://github.com/aniqatc/ai-assistant/blob/main/README.md\\" target=\\"_blank\\">README</a> file.</span>"}',
    ); // CONCATENATED MODULE: ./src/scripts/chat/chatCommands.js
    const commandsList = Object.keys(chatCommands_namespaceObject);
    const commandStyles = [
      "js-message",
      "js-message--chat",
      "js-message--command",
      "animate-slide-in",
      "animation-delay-300",
    ];

    function processCommand(userInput) {
      insertCommandMessage("", userInput);

      if (document.querySelector(`#js-radio-${userInput}`)) {
        document.querySelector(`#js-radio-${userInput}`).click();
      }
      if (
        document.querySelector(`#js-${userInput}-btn`) &&
        userInput !== "help"
      ) {
        document.querySelector(`#js-${userInput}-btn`).click();
      }
    }

    function insertCommandMessage(message, userInput) {
      const chatContainer = document.querySelector("#js-chat");
      const div = document.createElement("div");

      // if saved obj (message) from localStorage, otherwise, use userInput:
      div.innerHTML = message.el || chatCommands_namespaceObject[userInput];
      chatContainer.appendChild(div);
      div.classList.add(...commandStyles);

      autoScrollToBottom();
    } // CONCATENATED MODULE: ./src/scripts/ai/requestTime.js

    const resTime = document.querySelector("#js-response-time");
    const resTimeLabel = document.querySelector("#js-response-time-label");
    const resLabelStyles = {
      red: ["text-red-600", "dark:text-red-500"],
      green: ["text-green-600", "dark:text-green-500"],
    };

    function requestCompletionTime(startTime) {
      const timeDifference = Date.now() - startTime;
      const isLongResTime = timeDifference > 5000;

      resTimeLabel.classList.remove(
        ...(isLongResTime ? resLabelStyles.green : resLabelStyles.red),
      );
      resTimeLabel.classList.add(
        ...(isLongResTime ? resLabelStyles.red : resLabelStyles.green),
      );

      resTime.textContent = `${timeDifference / 1000}s`;
      printBottomToolbarMessage("Request completed...");
    } // CONCATENATED MODULE: ./src/scripts/ai/apiHelpers.js

    const API_KEY = undefined;
    let context = `Please provide responses in the following structured JSON format & do not provide ANY text outside of the JSON format:
{
    "1": {
        "element": "div",
        "content": "Your first message here."
    },
    "2": {
        "element": "pre",
        "content": {
            "code": "Your code snippet here",
            "language": "Specify programming language or null"
        }
    }
}`;

    function generatePrompt(option, userInput) {
      const guidelines = {
        explain: "Provide an explanation of what my code does line-by-line.",
        refactor: "Tell me how to improve my code snippet.",
        debug: "Help me identify the issue with my code.",
        convert: "Convert the code into the specified language.",
      };
      return encodeURIComponent(`${guidelines[option]} ${userInput}`);
    }

    function generateRequestURL(userInput) {
      const selectedRadio = document.querySelector(
        'input[name="options"]:checked',
      );
      const prompt = generatePrompt(selectedRadio.value, userInput);
      const encodedContext = encodeURIComponent(context);
      return `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${encodedContext}&key=${API_KEY}`;
    }

    function displayAIResponse(answer) {
      for (let el in answer) {
        const { element, content } = answer[el];
        content.code
          ? insertMessage(element, content.code, content.language)
          : insertMessage(element, content, null);
      }
    } // CONCATENATED MODULE: ./src/scripts/ai/api.js

    const aiStyles = [
      "js-message--chat",
      "js-message",
      "animate-slide-in",
      "animation-delay-300",
      "py-1",
    ];

    async function processAPIResponse(userInput) {
      const startTime = Date.now();
      printBottomToolbarMessage("Initiating request...");

      try {
        const response = await fetch(generateRequestURL(userInput));
        const data = await response.json();
        const answer = JSON.parse(data.answer);
        displayAIResponse(answer);
      } catch (error) {
        printBottomToolbarMessage(`Request error: ${error.message}...`);
      } finally {
        requestCompletionTime(startTime);
      }
    } // CONCATENATED MODULE: ./src/scripts/chat/userInput.js

    const userStyles = [
      "js-message",
      "js-message--chat",
      "js-message--user",
      "animate-slide-in",
      "animation-delay-300",
      "py-1",
      "text-slate-500",
      "dark:text-slate-300",
    ];

    const messageEl = document.querySelector("#js-toolbar-message");
    const userInput = document.querySelector("#js-user-input");
    const userInput_textarea = document.querySelector("#js-user-form");

    userInput_textarea.addEventListener("submit", (event) => {
      event.preventDefault();
      insertMessage("div", userInput.value, null, "user");

      const currentInputValue = userInput.value.toLowerCase().trim();
      commandsList.includes(currentInputValue)
        ? processCommand(currentInputValue)
        : processAPIResponse(currentInputValue);

      userInput.value = "";
      messageEl.textContent = "";
    }); // CONCATENATED MODULE: ./src/scripts/chat/insertMessage.js

    const insertMessage_chatContainer = document.querySelector("#js-chat");

    function insertMessage(elementType, content, lang, msgType = "ai") {
      const el = document.createElement(elementType);
      insertMessage_chatContainer.appendChild(el);

      if (lang && lang !== "undefined") {
        el.setAttribute("data-lang", lang); // to be used for storage
        myCodeTypewriter(el, content, lang);
      } else if (msgType === "user") {
        el.textContent = content; // no typewriting effect for user inputs
      } else {
        myTextTypewriter(el, content);
      }
      addMessageStyles(el, msgType);
      autoScrollToBottom();
    }

    // Helper
    function addMessageStyles(el, msgType) {
      if (msgType === "ai") {
        el.classList.add(...aiStyles);
      } else if (msgType === "user") {
        el.classList.add(...userStyles);
      } else if (msgType === "command") {
        el.classList.add(...commandStyles);
      }
    } // CONCATENATED MODULE: ./src/scripts/chat/chatHistory.js

    function saveChatHistory() {
      const printedMessages = document.querySelectorAll(".js-message--chat");
      const messagesArray = Array.from(printedMessages).map((message) => {
        const msgType = getMsgType(message);

        return {
          el: message.innerHTML,
          elementType: message.tagName.toLowerCase(),
          lang: message.getAttribute("data-lang") || null,
          content: message.textContent,
          msgType,
        };
      });

      localStorage.setItem("chatHistory", JSON.stringify(messagesArray));
    }

    function getChatHistory() {
      const storedMessages = JSON.parse(localStorage.getItem("chatHistory"));

      if (storedMessages && storedMessages.length > 0) {
        printBottomToolbarMessage("Chat retrieved from last session...");

        storedMessages.forEach((message) => {
          handleStoredMessage(message);
        });
      }
    }

    function clearChatHistory() {
      localStorage.setItem("chatHistory", "[]");
    }

    // Helpers
    function getMsgType(message) {
      if (Object.values(message.classList).includes("js-message--user")) {
        return "user";
      } else if (
        Object.values(message.classList).includes("js-message--command")
      ) {
        return "command";
      } else {
        return "ai";
      }
    }

    // Based on type (commands inserted without typewriting effect)
    function handleStoredMessage(message) {
      const { elementType, content, lang, msgType } = message;
      msgType === "command"
        ? insertCommandMessage(message)
        : insertMessage(elementType, content, lang, msgType);
    } // CONCATENATED MODULE: ./src/scripts/chat/downloadChat.js

    async function downloadChatHistory() {
      const chatContent = document.querySelector("#js-chat").innerHTML;
      const cssStyles = await getDownloadStyles();

      const chatBlob = new Blob([chatContent + cssStyles], {
        type: "text/html",
      });
      const currentDate = new Date().toISOString().split("T")[0];

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(chatBlob);
      downloadLink.download = `code.aniqa.dev_${currentDate}.html`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    async function getDownloadStyles() {
      const response = await fetch("/download.css");
      const cssText = await response.text();
      return `<style>${cssText}</style>`;
    } // CONCATENATED MODULE: ./src/scripts/ui/topToolbar.js

    const topToolbar_chatContainer = document.querySelector("#js-chat");
    const chatInput = document.querySelector("textarea");
    const copyButton = document.querySelector("#js-copy-btn");
    const saveButton = document.querySelector("#js-save-btn");
    const clearButton = document.querySelector("#js-clear-btn");
    const helpButton = document.querySelector("#js-help-btn");
    const downloadButton = document.querySelector("#js-download-btn");

    function displayTemporaryMessage(el, buttonText, message) {
      const originalText = el.innerHTML;
      el.textContent = "✔︎ " + buttonText; // temporary messaging within el
      printBottomToolbarMessage(message);

      setTimeout(() => {
        el.innerHTML = originalText;
      }, 600);
    }

    copyButton.addEventListener("click", async () => {
      const codeBlocks = topToolbar_chatContainer.querySelectorAll("pre");
      const recentCodeBlock = codeBlocks[codeBlocks.length - 1];

      const textToCopy =
        recentCodeBlock?.textContent || "No code blocks detected";
      await navigator.clipboard.writeText(textToCopy);
      displayTemporaryMessage(
        copyButton,
        "Copied",
        "Copied latest code snippet...",
      );
    });

    saveButton.addEventListener("click", () => {
      saveChatHistory(); // saves to localStorage
      displayTemporaryMessage(
        saveButton,
        "Saved",
        "Chat saved to workspace...",
      );
    });

    downloadButton.addEventListener("click", () => {
      downloadChatHistory();
      displayTemporaryMessage(downloadButton, "", "Downloaded current chat...");
    });

    helpButton.addEventListener("click", () => {
      processCommand("disclaimer");
      processCommand("help");
    });

    clearButton.addEventListener("click", () => {
      const messages =
        topToolbar_chatContainer.querySelectorAll(".js-message--chat");
      messages.forEach((el) => el.remove()); // removes from DOM
      clearChatHistory(); // removes from localStorage
      chatInput.value = ""; // clears input

      displayTemporaryMessage(
        clearButton,
        "Cleared",
        "Chat deleted from workspace...",
      );
    }); // CONCATENATED MODULE: ./src/scripts/index.js

    // Initialize
    applySavedTheme();
    typeDefaultMessages();
    printBottomToolbarMessage("New chat created...");
    applyRadioOption();
    getChatHistory();
  })();

  /******/
})();
