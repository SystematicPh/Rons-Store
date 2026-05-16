export function AuthForm({ title, subtitle, action, submitLabel, extraLink, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="subtle">{subtitle}</p>
      <form action={action} className="form-grid">
        {children}
        <button type="submit">{submitLabel}</button>
      </form>
      {extraLink ? <p className="subtle">{extraLink}</p> : null}
    </div>
  )
}
