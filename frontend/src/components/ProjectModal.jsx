import { useEffect, useState } from "react";

export default function ProjectModal({ mode = "create", initialProject = {}, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [name, setName] = useState(initialProject.name || "");
  const [description, setDescription] = useState(initialProject.description || "");
  const [startDate, setStartDate] = useState(initialProject.startDate || "");
  const [endDate, setEndDate] = useState(initialProject.endDate || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initialProject.name || "");
    setDescription(initialProject.description || "");
    setStartDate(initialProject.startDate || "");
    setEndDate(initialProject.endDate || "");
    setError("");
  }, [initialProject.name, initialProject.description, initialProject.startDate, initialProject.endDate]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Project name is required.");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setError("End date cannot be before the start date.");
      return;
    }

    onSave?.({
      ...initialProject,
      name: trimmedName,
      description: description.trim(),
      startDate,
      endDate,
    });
  }

  return (
    <div
      className="project-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="project-modal-header">
          <div>
            <p className="project-modal-eyebrow">{isEdit ? "Project settings" : "New project"}</p>
            <h2 className="project-modal-title" id="project-modal-title">
              {isEdit ? "Edit Project" : "Create New Project"}
            </h2>
          </div>
          <button className="project-modal-close" onClick={onClose} aria-label="Close">
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="project-modal-body">
            <div className="project-form-field">
              <label className="project-form-label project-form-required" htmlFor="project-name">
                Project name
              </label>
              <input
                id="project-name"
                className="project-form-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. Final Year Research Project"
                autoFocus
              />
            </div>

            <div className="project-form-field">
              <label className="project-form-label" htmlFor="project-description">
                Description
              </label>
              <textarea
                id="project-description"
                className="project-form-input project-form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short description of what this project is about…"
                rows={4}
              />
            </div>

            <div className="project-form-date-grid">
              <div className="project-form-field">
                <label className="project-form-label" htmlFor="project-start-date">
                  Start date
                </label>
                <input
                  id="project-start-date"
                  className="project-form-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="project-form-field">
                <label className="project-form-label" htmlFor="project-end-date">
                  End date
                </label>
                <input
                  id="project-end-date"
                  className="project-form-input"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="project-form-error" role="alert">{error}</p>}
          </div>

          <div className="project-modal-footer">
            <button type="button" className="project-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="project-modal-save">
              {isEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .project-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(15, 23, 42, 0.48);
          backdrop-filter: blur(3px);
          animation: projectModalFadeIn 0.15s ease-out;
        }
        .project-modal {
          width: min(100%, 560px);
          max-height: min(720px, 90vh);
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 16px;
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.2), 0 6px 18px rgba(15, 23, 42, 0.08);
          animation: projectModalSlideIn 0.18s ease-out;
        }
        .project-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 24px 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .project-modal-eyebrow {
          margin: 0 0 5px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .project-modal-title {
          margin: 0;
          color: #1a2340;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 24px;
          font-weight: 400;
          line-height: 1.2;
        }
        .project-modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          padding: 0;
          flex-shrink: 0;
          color: #64748b;
          background: #f8fafc;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .project-modal-close:hover {
          color: #1e293b;
          background: #e2e8f0;
        }
        .project-modal-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 22px 24px;
          max-height: 56vh;
          overflow-y: auto;
        }
        .project-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .project-form-label {
          color: #374151;
          font-size: 13px;
          font-weight: 600;
        }
        .project-form-required::after {
          content: " *";
          color: #ef4444;
        }
        .project-form-input {
          width: 100%;
          padding: 10px 12px;
          color: #1e293b;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.4;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .project-form-input::placeholder {
          color: #94a3b8;
        }
        .project-form-input:focus {
          border-color: #4f63d2;
          box-shadow: 0 0 0 3px rgba(79, 99, 210, 0.1);
        }
        .project-form-textarea {
          resize: vertical;
          min-height: 96px;
        }
        .project-form-date-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .project-form-error {
          margin: -4px 0 0;
          color: #dc2626;
          font-size: 12px;
          line-height: 1.4;
        }
        .project-modal-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          border-top: 1px solid #f1f5f9;
          background: #ffffff;
        }
        .project-modal-cancel,
        .project-modal-save {
          padding: 9px 18px;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .project-modal-cancel {
          color: #64748b;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
        }
        .project-modal-cancel:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .project-modal-save {
          color: #ffffff;
          background: #4f63d2;
          border: 1.5px solid #4f63d2;
        }
        .project-modal-save:hover {
          background: #3d50bf;
          border-color: #3d50bf;
          box-shadow: 0 2px 10px rgba(79, 99, 210, 0.25);
        }
        .project-modal-cancel:focus-visible,
        .project-modal-save:focus-visible,
        .project-modal-close:focus-visible {
          outline: 2px solid #4f63d2;
          outline-offset: 2px;
        }
        @keyframes projectModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes projectModalSlideIn {
          from { opacity: 0; transform: translateY(8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          .project-modal-overlay { padding: 14px; }
          .project-modal-header { padding: 20px; }
          .project-modal-body { padding: 20px; }
          .project-modal-footer { padding: 14px 20px; }
          .project-form-date-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
