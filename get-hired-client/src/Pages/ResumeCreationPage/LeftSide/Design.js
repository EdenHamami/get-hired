import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import design1 from '../../../images/design1.jpg';
import design2 from '../../../images/design2.jpg';
import design3 from '../../../images/design3.jpg';
import { FaFont, FaPalette, FaPencilAlt } from 'react-icons/fa';
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
  <option value="Arial, sans-serif" className='Arial'>Arial</option>
  <option value="'Courier New', monospace" className='Courier-New'>Courier New</option>
  <option value="'Times New Roman', serif" className='Times-New-Roman'>Times New Roman</option>
  <option value="Verdana, sans-serif"  className='Verdana'>Verdana</option>
  <option value="Nunito, sans-serif" className='Nunito' >Nunito</option>


</select>

      <BsFillCaretDownFill className="design-form-group-caret" />
    </div>
      {/* Font size */}
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

      {/* Background color */}
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

      {/* Font color */}
      <div className="design-form-group">
        <label htmlFor="fontColor" className="design-form-group-label">
          <FaPalette className="design-form-group-icon" />
          Font color:
        </label>
        <input
          type="color"
          name="fontColor"
          value={designOptions.fontColor}
          onChange={handleFontColorChange}
        />
      </div>

      {/* Background color 2 */}
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

      {/* Border color */}
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

      {/* Template */}
      <div className="design-form-group design-form-group-template">
        <label htmlFor="template" className="design-form-group-label">
          <FaPencilAlt className="design-form-group-icon" />
          Template:
        </label>
        <div className="design-templates">
          <label>
            <input
              type="radio"
              name="template"
              value="1"
              checked={templateId === 1}
              onChange={handleTemplateChange}
            />
            <img src={design1} alt="Design 1" className="design-thumbnail" />
          </label>
          <label>
            <input
              type="radio"
              name="template"
              value="2"
              checked={templateId === 2}
              onChange={handleTemplateChange}
            />
            <img src={design2} alt="Design 2" className="design-thumbnail" />
          </label>
          <label>
            <input
              type="radio"
              name="template"
              value="3"
              checked={templateId === 3}
              onChange={handleTemplateChange}
            />
            <img src={design3} alt="Design 3" className="design-thumbnail" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Design;
