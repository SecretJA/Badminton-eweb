import React from 'react';
import { FiInfo, FiAward, FiTool, FiPackage } from 'react-icons/fi';

interface CustomSpec {
  name: string;
  value: string;
}

interface Specifications {
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

interface ProductSpecificationsProps {
  specifications: Specifications;
  category?: string;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ 
  specifications, 
  category = 'general' 
}) => {
  // Map giá trị enum sang tiếng Việt
  const levelMap = {
    beginner: 'Người mới bắt đầu',
    intermediate: 'Trung cấp',
    advanced: 'Nâng cao',
    professional: 'Chuyên nghiệp'
  };

  const flexibilityMap = {
    stiff: 'Cứng',
    medium: 'Trung bình',
    flexible: 'Mềm dẻo'
  };

  const fitMap = {
    slim: 'Ôm',
    regular: 'Vừa',
    loose: 'Rộng'
  };

  // Nhóm thông số theo loại sản phẩm
  const getSpecificationGroups = () => {
    const groups = [];

    // Thông số cơ bản
    const basicSpecs = [];
    if (specifications.weight) basicSpecs.push({ label: 'Trọng lượng', value: specifications.weight });
    if (specifications.material) basicSpecs.push({ label: 'Chất liệu', value: specifications.material });
    if (specifications.size) basicSpecs.push({ label: 'Kích thước', value: specifications.size });
    if (specifications.color) basicSpecs.push({ label: 'Màu sắc', value: specifications.color });
    if (specifications.level) basicSpecs.push({ 
      label: 'Cấp độ', 
      value: levelMap[specifications.level] || specifications.level 
    });

    if (basicSpecs.length > 0) {
      groups.push({
        title: 'Thông số cơ bản',
        icon: FiInfo,
        specs: basicSpecs
      });
    }

    // Thông số kỹ thuật vợt
    const racketSpecs = [];
    if (specifications.balance) racketSpecs.push({ label: 'Điểm cân bằng', value: specifications.balance });
    if (specifications.flexibility) racketSpecs.push({ 
      label: 'Độ dẻo', 
      value: flexibilityMap[specifications.flexibility] || specifications.flexibility 
    });
    if (specifications.stringTension) racketSpecs.push({ label: 'Lực căng dây', value: specifications.stringTension });
    if (specifications.shaftMaterial) racketSpecs.push({ label: 'Chất liệu cán vợt', value: specifications.shaftMaterial });
    if (specifications.frameWidth) racketSpecs.push({ label: 'Độ dày khung', value: specifications.frameWidth });

    if (racketSpecs.length > 0) {
      groups.push({
        title: 'Thông số kỹ thuật vợt',
        icon: FiTool,
        specs: racketSpecs
      });
    }

    // Thông số giày
    const shoeSpecs = [];
    if (specifications.shoeSole) shoeSpecs.push({ label: 'Đế giày', value: specifications.shoeSole });
    if (specifications.cushioning) shoeSpecs.push({ label: 'Công nghệ đệm', value: specifications.cushioning });
    if (specifications.upperMaterial) shoeSpecs.push({ label: 'Chất liệu upper', value: specifications.upperMaterial });

    if (shoeSpecs.length > 0) {
      groups.push({
        title: 'Thông số giày',
        icon: FiPackage,
        specs: shoeSpecs
      });
    }

    // Thông số quần áo
    const clothingSpecs = [];
    if (specifications.fabric) clothingSpecs.push({ label: 'Vải', value: specifications.fabric });
    if (specifications.fit) clothingSpecs.push({ 
      label: 'Form dáng', 
      value: fitMap[specifications.fit] || specifications.fit 
    });
    if (specifications.breathability) clothingSpecs.push({ label: 'Khả năng thoáng khí', value: specifications.breathability });

    if (clothingSpecs.length > 0) {
      groups.push({
        title: 'Thông số quần áo',
        icon: FiPackage,
        specs: clothingSpecs
      });
    }

    // Thông số phụ kiện
    const accessorySpecs = [];
    if (specifications.length) accessorySpecs.push({ label: 'Chiều dài', value: specifications.length });
    if (specifications.width) accessorySpecs.push({ label: 'Chiều rộng', value: specifications.width });
    if (specifications.thickness) accessorySpecs.push({ label: 'Độ dày', value: specifications.thickness });

    if (accessorySpecs.length > 0) {
      groups.push({
        title: 'Kích thước',
        icon: FiPackage,
        specs: accessorySpecs
      });
    }

    // Thông tin chung
    const generalSpecs = [];
    if (specifications.warranty) generalSpecs.push({ label: 'Bảo hành', value: specifications.warranty });
    if (specifications.madeIn) generalSpecs.push({ label: 'Xuất xứ', value: specifications.madeIn });

    if (generalSpecs.length > 0) {
      groups.push({
        title: 'Thông tin chung',
        icon: FiAward,
        specs: generalSpecs
      });
    }

    // Thông số tùy chỉnh
    if (specifications.customSpecs && specifications.customSpecs.length > 0) {
      groups.push({
        title: 'Thông số khác',
        icon: FiInfo,
        specs: specifications.customSpecs.map(spec => ({
          label: spec.name,
          value: spec.value
        }))
      });
    }

    return groups;
  };

  const specificationGroups = getSpecificationGroups();

  if (specificationGroups.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Chưa có thông số kỹ thuật</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {specificationGroups.map((group, groupIndex) => {
        const IconComponent = group.icon;
        
        return (
          <div key={groupIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{group.title}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{spec.label}:</span>
                    <span className="text-gray-900 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSpecifications;
