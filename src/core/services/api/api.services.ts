import { RecordModel } from "../../model/record.model";
import apiHeaderConfiguration from "../../utils/axios/api-header-config.utils";
import defaultImage from "../../../assets/images/image/gallery-museum.png";

const getRecords = async (page: number, pageSize: number) => {
  try {
    const response = await apiHeaderConfiguration.get(`/artworks`, {
      params: {
        page: page,
        limit: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

const getRecordImage = (record: RecordModel) => {
  const baseUrl = "https://www.artic.edu/iiif/2/";

  if (record.image_id) {
    return `${baseUrl}${record.image_id}/full/843,/0/default.jpg`;
  }

  if (record.alt_image_ids && record.alt_image_ids.length > 0) {
    return `${baseUrl}${record.alt_image_ids[0]}/full/843,/0/default.jpg`;
  }

  return defaultImage;
};

export default { getRecords, getRecordImage };
