import React, { useState } from 'react';
import { StoryConfig, StoryMilestone, GalleryPhoto } from '../types/story';
import { saveStoryConfig, resetStoryConfig, validateStoryConfig } from '../utils/storyLogic';
import { X, Save, RotateCcw, Plus, Trash2, Heart, Music, CheckCircle2 } from 'lucide-react';

interface StoryCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoryConfig;
  onConfigUpdated: (newConfig: StoryConfig) => void;
}

type TabKey = 'general' | 'timeline' | 'letter' | 'gallery' | 'proposal' | 'audio';

export const StoryCustomizerModal: React.FC<StoryCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [formData, setFormData] = useState<StoryConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof StoryConfig, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index: number, field: keyof StoryMilestone, value: string) => {
    const updated = [...formData.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleAddMilestone = () => {
    const newMilestone: StoryMilestone = {
      id: `milestone-${Date.now()}`,
      title: 'Our New Chapter',
      date: 'Recent',
      description: 'A magical day filled with unforgettable memories and shared laughter.',
      imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Our romantic milestone'
    };
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  };

  const handleRemoveMilestone = (index: number) => {
    if (formData.milestones.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleGalleryChange = (index: number, field: keyof GalleryPhoto, value: string) => {
    const updated = [...formData.galleryPhotos];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, galleryPhotos: updated }));
  };

  const handleAddGalleryPhoto = () => {
    const newPhoto: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80',
      caption: 'A cherished quiet moment together',
      location: 'Our Special Place'
    };
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: [...prev.galleryPhotos, newPhoto]
    }));
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    if (formData.galleryPhotos.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const check = validateStoryConfig(formData);
    if (!check.isValid) {
      setValidationErrors(check.errors);
      return;
    }
    setValidationErrors([]);
    saveStoryConfig(formData);
    onConfigUpdated(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm('Reset all proposal settings back to default story values?')) {
      const def = resetStoryConfig();
      setFormData(def);
      onConfigUpdated(def);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      data-testid="story-customizer-modal"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#10090D] border border-[#D6B779]/40 shadow-2xl text-[#F7EDE5] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D6B779]/20 bg-[#1E070F]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D6B779] fill-[#D6B779]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#F7EDE5]">
              Proposal Story Studio & Customization
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#D6B779]/30 flex items-center justify-center text-[#F7EDE5] hover:text-[#D6B779] transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 px-6 py-2.5 bg-[#160C12] border-b border-[#D6B779]/15 text-xs uppercase tracking-wider font-sans">
          {(
            [
              { key: 'general', label: 'Names & Dates' },
              { key: 'timeline', label: 'Timeline Milestones' },
              { key: 'letter', label: 'Love Letter' },
              { key: 'gallery', label: 'Photo Gallery' },
              { key: 'proposal', label: 'Proposal & Climax' },
              { key: 'audio', label: 'Sound & Ambiance' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'border-b-2 border-[#D6B779] text-[#D6B779] font-medium'
                  : 'text-[#F7EDE5]/60 hover:text-[#F7EDE5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Validation Errors banner */}
        {validationErrors.length > 0 && (
          <div className="mx-6 mt-4 p-3 bg-[#6E182D]/40 border border-[#C88D91] text-xs text-[#F7EDE5]">
            <ul className="list-disc pl-4 space-y-1">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    Recipient's Name (Your Partner)
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleTextChange('recipientName', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                    placeholder="e.g. Sophia"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    Proposer's Name (You)
                  </label>
                  <input
                    type="text"
                    value={formData.proposerName}
                    onChange={(e) => handleTextChange('proposerName', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                    placeholder="e.g. Alexander"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    Relationship Start / Meeting Date
                  </label>
                  <input
                    type="date"
                    value={formData.meetingDate}
                    onChange={(e) => handleTextChange('meetingDate', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    Proposal Date Label
                  </label>
                  <input
                    type="text"
                    value={formData.proposalDate}
                    onChange={(e) => handleTextChange('proposalDate', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                    placeholder="Today & Forever"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Hero Main Headline
                </label>
                <textarea
                  rows={2}
                  value={formData.heroHeadline}
                  onChange={(e) => handleTextChange('heroHeadline', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Hero Supporting Message
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSupporting}
                  onChange={(e) => handleTextChange('heroSupporting', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#D6B779]">
                  Milestone Story Chapters ({formData.milestones.length})
                </span>
                <button
                  onClick={handleAddMilestone}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D6B779]/50 text-xs uppercase tracking-wider text-[#D6B779] hover:bg-[#350D19] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-4 border border-[#D6B779]/20 bg-[#1E070F] space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[#D6B779] font-medium">
                        Chapter {idx + 1}
                      </span>
                      {formData.milestones.length > 1 && (
                        <button
                          onClick={() => handleRemoveMilestone(idx)}
                          className="text-[#C88D91] hover:text-red-400 p-1 cursor-pointer"
                          title="Remove milestone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">Title</label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                          className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">Date</label>
                        <input
                          type="text"
                          value={m.date}
                          onChange={(e) => handleMilestoneChange(idx, 'date', e.target.value)}
                          className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">
                        Photo Image URL
                      </label>
                      <input
                        type="text"
                        value={m.imageUrl}
                        onChange={(e) => handleMilestoneChange(idx, 'imageUrl', e.target.value)}
                        className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">
                        Emotional Description
                      </label>
                      <textarea
                        rows={2}
                        value={m.description}
                        onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                        className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Love Letter Title
                </label>
                <input
                  type="text"
                  value={formData.loveLetterTitle}
                  onChange={(e) => handleTextChange('loveLetterTitle', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Love Letter Paragraphs (One paragraph per line)
                </label>
                <textarea
                  rows={10}
                  value={formData.loveLetterContent.join('\n\n')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      loveLetterContent: e.target.value.split('\n\n').filter((p) => p.trim().length > 0)
                    }))
                  }
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 p-3 text-sm font-serif text-[#F7EDE5] leading-relaxed focus:border-[#D6B779] outline-none"
                />
                <span className="text-[11px] text-[#C88D91]/70">
                  Separate paragraphs with a blank empty line.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#D6B779]">
                  Photo Gallery ({formData.galleryPhotos.length})
                </span>
                <button
                  onClick={handleAddGalleryPhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D6B779]/50 text-xs uppercase tracking-wider text-[#D6B779] hover:bg-[#350D19] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.galleryPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-4 border border-[#D6B779]/20 bg-[#1E070F] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#D6B779] font-medium">Photo #{idx + 1}</span>
                      {formData.galleryPhotos.length > 1 && (
                        <button
                          onClick={() => handleRemoveGalleryPhoto(idx)}
                          className="text-[#C88D91] hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">Image URL</label>
                      <input
                        type="text"
                        value={photo.url}
                        onChange={(e) => handleGalleryChange(idx, 'url', e.target.value)}
                        className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">Caption</label>
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)}
                          className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#D6B779]/80 mb-0.5">Location</label>
                        <input
                          type="text"
                          value={photo.location || ''}
                          onChange={(e) => handleGalleryChange(idx, 'location', e.target.value)}
                          className="w-full bg-[#10090D] border border-[#D6B779]/20 px-2.5 py-1.5 text-xs text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'proposal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Proposal Pre-Question Whisper
                </label>
                <input
                  type="text"
                  value={formData.proposalPreQuestion}
                  onChange={(e) => handleTextChange('proposalPreQuestion', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Ultimate Proposal Question
                </label>
                <input
                  type="text"
                  value={formData.proposalQuestion}
                  onChange={(e) => handleTextChange('proposalQuestion', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    YES Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.yesButtonText}
                    onChange={(e) => handleTextChange('yesButtonText', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                    Alternative Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.momentButtonText}
                    onChange={(e) => handleTextChange('momentButtonText', e.target.value)}
                    className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  YES Response Title
                </label>
                <input
                  type="text"
                  value={formData.yesResponseTitle}
                  onChange={(e) => handleTextChange('yesResponseTitle', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  YES Response Subtitle
                </label>
                <input
                  type="text"
                  value={formData.yesResponseSubtitle}
                  onChange={(e) => handleTextChange('yesResponseSubtitle', e.target.value)}
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D6B779] mb-1">
                  Custom Romantic Background Music Stream URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.customAudioUrl || ''}
                  onChange={(e) => handleTextChange('customAudioUrl', e.target.value)}
                  placeholder="https://... (Leave blank for built-in romantic procedural piano)"
                  className="w-full bg-[#1E070F] border border-[#D6B779]/30 px-3 py-2 text-sm text-[#F7EDE5] focus:border-[#D6B779] outline-none"
                />
                <span className="text-[11px] text-[#C88D91]/70 block mt-1">
                  If left blank, the applet uses its built-in acoustic Web Audio API romantic piano & pad synthesizer.
                </span>
              </div>

              <div className="pt-4 border-t border-[#D6B779]/20 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enablePetals"
                    checked={formData.enablePetals}
                    onChange={(e) => handleTextChange('enablePetals', e.target.checked)}
                    className="accent-[#D6B779] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="enablePetals" className="text-sm text-[#F7EDE5] cursor-pointer">
                    Enable floating cinematic rose petals
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enableSparkles"
                    checked={formData.enableSparkles}
                    onChange={(e) => handleTextChange('enableSparkles', e.target.checked)}
                    className="accent-[#D6B779] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="enableSparkles" className="text-sm text-[#F7EDE5] cursor-pointer">
                    Enable golden sparkling dust particles
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#D6B779]/20 bg-[#1E070F]">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#C88D91] hover:text-[#F7EDE5] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#F7EDE5]/70 hover:text-[#F7EDE5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D6B779] to-[#EAD5A8] text-[#10090D] font-sans text-xs uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10090D]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save & Apply</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
