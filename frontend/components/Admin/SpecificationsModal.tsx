import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../lib/axios';
import ProductSpecificationsForm from '../Products/ProductSpecificationsForm';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface SpecificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  currentSpecifications?: any;
}

const SpecificationsModal: React.FC<SpecificationsModalProps> = ({
  isOpen,
  onClose,
  productId,
  currentSpecifications = {}
}) => {
  const queryClient = useQueryClient();

  const updateSpecificationsMutation = useMutation(
    async (specifications: any) => {
      const response = await axios.put(`/products/${productId}/specifications`, specifications);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product', productId]);
        queryClient.invalidateQueries(['adminProducts']);
        toast.success('Cập nhật thông số kỹ thuật thành công!');
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
      }
    }
  );

  const handleSave = (specifications: any) => {
    updateSpecificationsMutation.mutate(specifications);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Chỉnh sửa thông số kỹ thuật
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <ProductSpecificationsForm
            specifications={currentSpecifications}
            onSave={handleSave}
            onCancel={onClose}
            loading={updateSpecificationsMutation.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificationsModal;
