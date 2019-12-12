import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";
import { renderToString } from 'react-dom/server';
import MDX from '@mdx-js/runtime';
import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night';

const isEmpty = str => !str || str.length === 0;

function onChange(newValue) {
    console.log("change", newValue);
}

export function Editor({ changeHandler, code }) {
      // Render editor
      return (
            <div className="w-50 h-100">
                <AceEditor
                    value={code}
                    mode="markdown"
                    onChange={changeHandler}
                    debounceChangePeriod={500}
                    theme="tomorrow_night"
                    fontSize={18}
                    width="100%"
                    height="100%"
                    position="absolute"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                    showInvisibles: false,
                    tabSize: 4,
                    cursorStyle: 'smooth',
                    displayIndentGuides: true,
                    fontFamily: 'courier',
                    fontSize: '18',
                    }}
                />
            </div>
      );
}

export function Viewer({ raw }) {
    // Render editor
    const [tunnel, setTunnel] = useState('');
    const [lastGood, setLastGood] = useState('');
    const display = !isEmpty(raw) ? raw : '<p> enter code to begin </p>';
    let inject;
    try {
        inject = renderToString(<MDX>{display}</MDX>);
        setLastGood(display);
    } catch (err) {
        inject = renderToString(<MDX>{lastGood}</MDX>);
    }
    useEffect(() => {
        let tunnelUrl = '';
        const blob = new Blob([inject], {type: 'text/html'})
        tunnelUrl = URL.createObjectURL(blob);
        if (!isEmpty(tunnel)) URL.revokeObjectURL(tunnel);
        setTunnel(tunnelUrl);
        return () => {
            if (!isEmpty(tunnelUrl)) {
              URL.revokeObjectURL(tunnelUrl);
            }
            setTunnel('');
          };
        }, [raw]);
    return (
          <div className="w-50 h-100">
              <iframe
                src={tunnel}
                sandbox='allow-scripts'
                title="preview"
                className="w-100 h-100"
                />
          </div>
    );
}