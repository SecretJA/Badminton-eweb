import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface CustomSpec {
  name: string;
  value: string;
}

interface SpecificationsFormData {
  // Vợt cầu lông
  weight?: string;
  material?: string;
  size?: string;
  color?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  
  // Thông số kỹ thuật vợt
  balance?: string;
  flexibility?: 'stiff' | 'medium' | 'flexible';
  stringTension?: string;
  shaftMaterial?: string;
  frameWidth?: string;
  
  // Giày cầu lông
  shoeSole?: string;
  cushioning?: string;
  upperMaterial?: string;
  
  // Quần áo
  fabric?: string;
  fit?: 'slim' | 'regular' | 'loose';
  breathability?: string;
  
  // Phụ kiện
  length?: string;
  width?: string;
  thickness?: string;
  
  // Thông số chung
  warranty?: string;
  madeIn?: string;
  
  // Thông số tùy chỉnh
  customSpecs?: CustomSpec[];
}

interface ProductSpecificationsFormProps {
  specifications?: SpecificationsFormData;
  onSave: (specifications: SpecificationsFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProductSpecificationsForm: React.FC<ProductSpecificationsFormProps> = ({
  specifications = {},
  onSave,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<SpecificationsFormData>(specifications);
  const [customSpecs, setCustomSpecs] = useState<CustomSpec[]>(specifications.customSpecs || []);

  useEffect(() => {
    setFormData(specifications);
    setCustomSpecs(specifications.customSpecs || []);
  }, [specifications]);

  const handleInputChange = (field: keyof SpecificationsFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || undefined
    }));
  };

  const addCustomSpec = () => {
    setCustomSpecs(prev => [...prev, { name: '', value: '' }]);
  };

  const updateCustomSpec = (index: number, field: 'name' | 'value', value: string) => {
    setCustomSpecs(prev => 
      prev.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    );
  };

  const removeCustomSpec = (index: number) => {
    setCustomSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty custom specs
    const validCustomSpecs = customSpecs.filter(spec => spec.name.trim() && spec.value.trim());
    
    // Remove empty fields
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );
    
    onSave({
      ...cleanedData,
      customSpecs: validCustomSpecs.length > 0 ? validCustomSpecs : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Thông số cơ bản */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trọng lượng
            </label>
            <input
              type="text"
              value={formData.weight || ''}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="VD: 88g"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chất liệu
            </label>
            <input
              type="text"
              value={formData.material || ''}
              onChange={(e) => handleInputChange('material', e.target.value)}
              placeholder="VD: Carbon Fiber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kích thước
            </label>
            <input
              type="text"
              value={formData.size || ''}
              onChange={(e) => handleInputChange('size', e.target.value)}
              placeholder="VD: 4U G5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Màu sắc
            </label>
            <input
              type="text"
              value={formData.color || ''}
              onChange={(e) => handleInputChange('color', e.target.value)}
              placeholder="VD: Đen/Đỏ"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cấp độ
            </label>
            <select
              value={formData.level || ''}
              onChange={(e) => handleInputChange('level', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn cấp độ</option>
              <option value="beginner">Người mới bắt đầu</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
              <option value="professional">Chuyên nghiệp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật vợt */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật vợt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Điểm cân bằng
            </label>
            <input
              type="text"
              value={formData.balance || ''}
              onChange={(e) => handleInputChange('balance', e.target.value)}
              placeholder="VD: Head Heavy"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Độ dẻo
            </label>
            <select
              value={formData.flexibility || ''}
              onChange={(e) => handleInputChange('flexibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn độ dẻo</option>
              <option value="stiff">Cứng</option>
              <option value="medium">Trung bình</option>
              <option value="flexible">Mềm dẻo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lực căng dây
            </label>
            <input
              type="text"
              value={formData.stringTension || ''}
              onChange={(e) => handleInputChange('stringTension', e.target.value)}
              placeholder="VD: 20-28 lbs"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chất liệu cán vợt
            </label>
            <input
              type="text"
              value={formData.shaftMaterial || ''}
              onChange={(e) => handleInputChange('shaftMaterial', e.target.value)}
              placeholder="VD: Carbon Fiber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Độ dày khung
            </label>
            <input
              type="text"
              value={formData.frameWidth || ''}
              onChange={(e) => handleInputChange('frameWidth', e.target.value)}
              placeholder="VD: 9.5mm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Thông số chung */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bảo hành
            </label>
            <input
              type="text"
              value={formData.warranty || ''}
              onChange={(e) => handleInputChange('warranty', e.target.value)}
              placeholder="VD: 12 tháng"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xuất xứ
            </label>
            <input
              type="text"
              value={formData.madeIn || ''}
              onChange={(e) => handleInputChange('madeIn', e.target.value)}
              placeholder="VD: Trung Quốc"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Thông số tùy chỉnh */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Thông số tùy chỉnh</h3>
          <button
            type="button"
            onClick={addCustomSpec}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="w-4 h-4" />
            Thêm thông số
          </button>
        </div>
        
        {customSpecs.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Chưa có thông số tùy chỉnh</p>
        ) : (
          <div className="space-y-3">
            {customSpecs.map((spec, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => updateCustomSpec(index, 'name', e.target.value)}
                  placeholder="Tên thông số"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateCustomSpec(index, 'value', e.target.value)}
                  placeholder="Giá trị"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeCustomSpec(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <FiSave className="w-4 h-4" />
          {loading ? 'Đang lưu...' : 'Lưu thông số'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductSpecificationsForm;
