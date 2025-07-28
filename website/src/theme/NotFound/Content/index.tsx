import React, {type ReactNode} from 'react';
import clsx from 'clsx';

// Define our own Props interface since we're not using the theme one
interface Props {
  className?: string;
}

function getCategoryFromPath(pathname: string): string | null {
  const match = pathname.match(/\/docs\/category\/(\w+)/);
  return match ? match[1] : null;
}

function getCliCommand(category: string): string {
  const commands = {
    'ideas': './scrap idea "Your idea title" "Description of your idea" --tags="tag1,tag2"',
    'prompts': './scrap prompt "Prompt name" "Your prompt text here" --category="general" --tags="tag1,tag2"',
    'todos': './scrap todo "Task title" "Task description" --priority="medium" --tags="tag1,tag2"',
    'journal': './scrap journal "Entry title" "Your thoughts and reflections" --tags="tag1,tag2"',
    'workflows': './scrap workflow "Workflow name" "Process description" --category="general" --tags="tag1,tag2"',
    'diagrams': 'Create diagrams using Mermaid syntax in markdown files'
  };
  return commands[category] || './scrap --help';
}

export default function NotFoundContent({className}: Props): ReactNode {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const category = getCategoryFromPath(pathname);

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--12">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {/* ASCII Art - SCRAPBOOK using CSS */}
            <div className="hero__title" style={{ marginBottom: '2rem' }}>
            </div>

            {/* ASCII Art - 404 */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.5rem',
              lineHeight: '1.2',
              background: 'linear-gradient(to bottom, #ffff00 0%, #ffff00 20%, #ffa500 20%, #ffa500 40%, #ff8c00 40%, #ff8c00 60%, #ff4500 60%, #ff4500 80%, #ff0000 80%, #ff0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              whiteSpace: 'pre',
              textShadow: '4px 4px 0px rgba(0, 0, 0, 0.6), 5px 5px 0px rgba(0, 0, 0, 0.4), 6px 6px 0px rgba(0, 0, 0, 0.2)'
            }}>
{`  |  |     _ \\   |  |   
  |  |    |   |  |  |   
 ___ __|  |   | ___ __| 
    _|   \\___/     _|   `}
            </div>
          
            {category && (
              <div style={{
                background: 'var(--ifm-color-emphasis-100)',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem',
                marginBottom: '2rem',
                textAlign: 'left',
                maxWidth: '600px',
                margin: '2rem auto'
              }}>
                <h3>No {category} found yet</h3>
                <p>Get started by creating your first {category.slice(0, -1)} using the CLI:</p>
                <div style={{
                  background: 'var(--ifm-color-emphasis-200)',
                  padding: '1rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  fontSize: '0.9rem',
                  marginTop: '1rem'
                }}>
                  {getCliCommand(category)}
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                  After creating content, it will automatically appear in this section.
                </p>
              </div>
            )}

            <div style={{
              background: 'var(--ifm-color-emphasis-100)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              padding: '1.5rem',
              borderRadius: '8px',
              borderLeft: '4px solid #ff6b35',
              marginBottom: '2rem',
              textAlign: 'left',
              maxWidth: '600px',
              margin: '2rem auto'
            }}>
              <p><strong>Try exploring:</strong></p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/docs/category/cli">CLI Reference</a> - Command documentation</li>
                <li><a href="/docs/category/ideas">Ideas</a> - Creative thoughts and insights</li>
                <li><a href="/docs/category/todos">Todos</a> - Tasks and reminders</li>
                <li><a href="/docs/category/journal">Journal</a> - Daily reflections</li>
                <li><a href="/docs/category/workflows">Workflows</a> - Process documentation</li>
                <li><a href="/docs/category/diagrams">Diagrams</a> - Visual representations</li>
              </ul>
            </div>
            <a 
              href="/" 
              className="button button--primary button--lg"
              style={{ 
                background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                border: 'none'
              }}
            >
              Return to Scrapbook Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
