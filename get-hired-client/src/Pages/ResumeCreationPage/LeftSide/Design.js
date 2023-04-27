import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { FaFont, FaPalette, FaPencilAlt } from 'react-icons/fa'; // Remove the duplicate import
import { BsFillCaretDownFill } from 'react-icons/bs';
import './Design.css';

function Design() {
  const { designOptions, setDesignOptions } = useContext(ResumeContext);
  const { templateId, setTemplateId } = useContext(ResumeContext);

  const handleFontFamilyChange = (e) => {
    const newResumeStyle = { ...designOptions, fontFamily: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleFontSizeChange = (e) => {
    const newResumeStyle = { ...designOptions, fontSize: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleBackgroundColorChange = (e) => {
    const newResumeStyle = { ...designOptions, backgroundColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleFontColorChange = (e) => {
    const newResumeStyle = { ...designOptions, fontColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleBorderColorChange = (e) => {
    const newResumeStyle = { ...designOptions, borderColor: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleBackgroundColor2Change = (e) => {
    const newResumeStyle = { ...designOptions, backgroundColor2: e.target.value };
    setDesignOptions(newResumeStyle);
  };

  const handleTemplateChange = (e) => {
    setTemplateId(parseInt(e.target.value));
  };

  return (
    <div className="design">
      <div className="design-header">
        <FaPalette className="design-header-icon" />
        <h3>Design</h3>
      </div>

      <div className="design-form-group">
        <label htmlFor="fontFamily" className="design-form-group-label">
          <FaFont className="design-form-group-icon" />
          Font family:
        </label>
        <select name="fontFamily" value={designOptions.fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <BsFillCaretDownFill className="design-form-group-caret" />
      </div>

      <div className="design-form-group">
        <label htmlFor="fontSize" className="design-form-group-label">
          <FaPencilAlt className="design-form-group-icon" />
          Font size:
        </label>
        <input
          type="number"
          name="fontSize"
          value={designOptions.fontSize}
          min="8"
          max="24"
          step="1"
          onChange={handleFontSizeChange}
        />
      </div>

      <div className="design-form-group">
        <label htmlFor="backgroundColor" className="design-form-group-label">
          <FaPalette className="design-form-group-icon" />
          Background color:
        </label>
        <input
          type="color"
          name="backgroundColor"
          value={designOptions.backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </div>

      <div className="design-form-group">
        <label htmlFor="fontColor" className="design-form-group-label">
          <FaPalette      className="design-form-group-icon"
    />
    Font color:
    </label>
    <input
      type="color"
      name="fontColor"
      value={designOptions.fontColor}
      onChange={handleFontColorChange}
    />
  </div>

  {templateId === 3 && (
    <div className="design-form-group">
      <label htmlFor="backgroundColor2" className="design-form-group-label">
        <FaPalette className="design-form-group-icon" />
        Background color 2:
      </label>
      <input
        type="color"
        name="backgroundColor2"
        value={designOptions.backgroundColor2}
        onChange={handleBackgroundColor2Change}
      />
    </div>
  )}

  <div className="design-form-group">
    <label htmlFor="borderColor" className="design-form-group-label">
      <FaPalette className="design-form-group-icon" />
      Border color:
    </label>
    <input
      type="color"
      name="borderColor"
      value={designOptions.borderColor}
      onChange={handleBorderColorChange}
    />
  </div>

  <div className="design-form-group">
    <label htmlFor="template" className="design-form-group-label">
      <FaPencilAlt className="design-form-group-icon" />
      Template:
    </label>
    <select name="template" value={templateId} onChange={handleTemplateChange}>
      <option value="1">Template 1</option>
      <option value="2">Template 2</option>
      <option value="3">Template 3</option>
    </select>
    <BsFillCaretDownFill className="design-form-group-caret" />
  </div>
</div>
);
}

export default Design;
