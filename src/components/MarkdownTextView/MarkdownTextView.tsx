import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from "remark-gfm"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import 'katex/dist/katex.min.css'
import { SYNTAX_THEME } from 'src/Constants';
import './MarkdownTextView.css'
import rehypeRaw from "rehype-raw"

function MarkdownTextView(props: { rawText?: string, disableCodeHighlighter?: boolean, disableCopy?: boolean, enableHTML?: boolean, inline?: boolean }) {
    let overrideAction = (ev: ClipboardEvent) => {
        ev.preventDefault()
    }
    
    useEffect(() => {
        if (props.disableCopy) {
            const markdownViews = document.getElementsByClassName("markdown-view")
            for (let i = 0; i < markdownViews.length; i++) {
                let view = markdownViews.item(i) as HTMLDivElement
                view.removeEventListener('copy', overrideAction)
                view.addEventListener('copy', overrideAction)
            }
        }
    })
    
    return <ReactMarkdown children={props.rawText || 'No text to show.'} className={`markdown-view${props.inline ? " inline" : ""}`} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex, ...(props.enableHTML ? [rehypeRaw] : [])]}
    components={props.disableCodeHighlighter ? {} : {
        code({node, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
                <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    // @ts-ignore
                    style={SYNTAX_THEME}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                />
            ) : (
                <span className='inline-code'>
                    <code {...props} className={className}>
                        {children}
                    </code>
                </span>
            )
        }
    }}
    />;
}
 
export default MarkdownTextView;