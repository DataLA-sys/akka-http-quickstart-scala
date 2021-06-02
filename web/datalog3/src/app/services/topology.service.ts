import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Topology } from "../classes/topology";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopologyService {
  data: Topology = {"tools":[],"actions":[],"datasets":[{"name":"showcase_pravo","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_pravolevel2_searchcasearbitr","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_spark","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_spark_response_json_clob.tenders","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"showcase_spark_response_json_clob.risk_factors","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"showcase_spark_response_json_clob.company_status","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"showcase_spark_response_json_clob.entrepreneur_status","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_bias","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_bias_response_json_clob.get_fssp","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_beeline2","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_beeline2_response_json_clob.getscore","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_1of","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_2gis","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_2gis_level2","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_atol","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_atol_level2","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_csv_monitor_ved__","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_evotor","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_mailru","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_nebo","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_ofdya","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_ofdya_l_2","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_taxcom","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_geointellect","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_syn","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_errors_backend","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_errors","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[{"name":"showcase_errors_data_by_source","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"showcase_errors_data_by_source_nebo","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"showcase_errors_data_by_source_beeline_mailru","project":"Oliver_Wyman","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"showcase_requests","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_requests","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_request_items_input","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_request_items","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"showcase_request_items_output","project":"Oliver_Wyman","layer":"DataMart","in":[{"name":"ow_ow_prod_data_request_items","project":"Oliver_Wyman","layer":"Raw","in":[{"name":"source_processing","project":"Oliver_Wyman","layer":"External","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_union_source","project":"Connector_data","layer":"DataMart","in":[{"name":"credreg_alfacre_connector_data","project":"Connector_data","layer":"Raw","in":[],"out":[],"datasetType":"Table"},{"name":"cr_source2_connector_data","project":"Connector_data","layer":"Raw","in":[],"out":[],"datasetType":"Table"}],"out":[{"name":"cr_connector_data_41","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_54","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_0","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_3","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_6","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_22","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_40","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_48","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"},{"name":"cr_connector_data_52","project":"Connector_data","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"datasetType":"Table"},{"name":"imbr_cre_comp_req","project":"BKI","layer":"DataMart","in":[{"name":"imbr_request_comp","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"company_request_bki","project":"BKI","layer":"DataMart","in":[{"name":"country_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/country_sdim"},{"name":"clientaddress_shist","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/clientaddress_shist/month_part=??????/*.parquet"},{"name":"clientppdconsent_htran","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/clientppdconsent_htran"},{"name":"currency_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/currency_sdim/*.parquet"},{"name":"channel_hdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/channel_hdim"},{"name":"deal_edim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/deal_edim/month_part=??????/"},{"name":"bapplication","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/live_system/l_hdb/DET/SM3_MASS/BAPPLICATION"},{"name":"client_edim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/client_edim/year_part=????/*.parquet"},{"name":"bcompany","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/live_system/l_hdb/DET/SM3_MASS/BCOMPANY"},{"name":"source_company_request_bki","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"broken_record_imbr_cre_comp_req","project":"BKI","layer":"DataMart","in":[{"name":"company_request_bki","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_request_rb","project":"BKI","layer":"DataMart","in":[{"name":"person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"person_request_bki_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_cre_req_mb","project":"BKI","layer":"DataMart","in":[{"name":"imbr_request_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"imbr_request_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"person_request_bki_mb","project":"BKI","layer":"DataMart","in":[{"name":"clientpapertype_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/clientpapertype_sdim"},{"name":"bapplication","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/live_system/l_hdb/DET/SM3_MASS/BAPPLICATION"},{"name":"country_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/country_sdim"},{"name":"clientaddress_shist","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/clientaddress_shist/month_part=??????/*.parquet"},{"name":"clientppdconsent_htran","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/clientppdconsent_htran"},{"name":"client_edim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/client_edim/year_part=????/*.parquet"},{"name":"birth_xdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/birth_xdim"},{"name":"channel_hdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/channel_hdim"},{"name":"bperson","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/live_system/l_hdb/DET/SM3_MASS/BPERSON"},{"name":"gender_lov","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/gender_lov"},{"name":"doc_type","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"None"},{"name":"source_person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"source_person_request_bki_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_cre_req_rb","project":"BKI","layer":"DataMart","in":[{"name":"imbr_request_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"imbr_request_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"broken_record_imbr_cre_req_rb","project":"BKI","layer":"DataMart","in":[{"name":"person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"person_request_bki_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"person_request_bki_rb","project":"BKI","layer":"DataMart","in":[{"name":"clientpapertype_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/clientpapertype_sdim"},{"name":"gender_lov","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/gender_lov"},{"name":"country_sdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/country_sdim"},{"name":"clientaddress_shist","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/clientaddress_shist/month_part=??????/*.parquet"},{"name":"clientppdconsent_htran","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/clientppdconsent_htran"},{"name":"client_edim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/client_edim/year_part=????/*.parquet"},{"name":"birth_xdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh4dm/db/birth_xdim"},{"name":"channel_hdim","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"/storage/s_dwh/db/channel_hdim"},{"name":"doc_type","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"file","pathToData":"None"},{"name":"l_hdb_det.wsrm_log","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"{source_db}.source_person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"source_person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"broken_record_imbr_cre_req_mb","project":"BKI","layer":"DataMart","in":[{"name":"person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"person_request_bki_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_request_mb","project":"BKI","layer":"DataMart","in":[{"name":"person_request_bki_rb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"person_request_bki_mb","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_dataset_status","project":"BKI","layer":"DataMart","in":[{"name":"{imbr_table}","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"imbr_request_comp","project":"BKI","layer":"DataMart","in":[{"name":"company_request_bki","project":"BKI","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"IMBR.IMBR_CRE_REQ","project":"BKI","layer":"External","in":[{"name":"imbr_cre_req_rb","project":"BKI","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"IMBR.IMBR_CRE_REQ","project":"BKI","layer":"External","in":[{"name":"imbr_cre_req_mb","project":"BKI","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"IMBR.IMBR_CRE_COMP_REQ","project":"BKI","layer":"External","in":[{"name":"imbr_cre_comp_req","project":"BKI","layer":"DataMart","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_main_client_info_spark","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_main_client_info_spark","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_liq_cases","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_liq_cases","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_dynamic_dates","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_dynamic_dates","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_balance_factors","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_balance_factors","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_exe_ow_tran_in_agg","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_exe_ow_tran_in_agg","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_exchange_rate_cur","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_exchange_rate_cur","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_ovrdueprincp_growth","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_ovrdueprincp_growth","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_bcompany","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_bcompany","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_rko_current_accounts","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_rko_current_accounts","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_load_management_table","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.load_management_table","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_exe_ow_tran_out_agg","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_exe_ow_tran_out_agg","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_exe_ow_tran_clean","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_exe_ow_tran_clean","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_overdues","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_overdues","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_uk_2_inn_spark_all","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_uk_2_inn_spark_all","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_requests","project":"Oliver_Wyman","layer":"Hive","in":[{"name":"ow_prod_data.requests","project":"Oliver_Wyman","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_exchange_rate_year","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_exchange_rate_year","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_ul_static","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_ul_static","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_cred_dyn","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_cred_dyn","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_account_sdim","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_account_sdim","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_exe_ow_tran_factors","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.exe_ow_tran_factors","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_finance_results_bcompvisit","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_finance_results_bcompvisit","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_rko_deals","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_rko_deals","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_credit_deals","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_credit_deals","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_overdues","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_overdues","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_pass_bal","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_pass_bal","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_proc_logs","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.proc_logs","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_deals_features","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_deals_features","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_revolve_util","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_revolve_util","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_deals_features","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_deals_features","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_csv_monitor_ved","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.csv_monitor_ved","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_exchange_rate_cur","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_exchange_rate_cur","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_liq_cases","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_liq_cases","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_client_list","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_client_list","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_exe_ow_tran_factors","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_exe_ow_tran_factors","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_ow_balance_factors","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.ow_balance_factors","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_deposit_deals","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_deposit_deals","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_finance_results_bcompvisit","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_finance_results_bcompvisit","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_ul_static","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_ul_static","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_errors","project":"Oliver_Wyman","layer":"Hive","in":[{"name":"ow_prod_data.errors","project":"Oliver_Wyman","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_wrk_ow_exchange_rate_year","project":"Oliver_Wyman_Dictionary","layer":"Hive","in":[{"name":"ow_prod_data.wrk_ow_exchange_rate_year","project":"Oliver_Wyman_Dictionary","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_source_processing","project":"Oliver_Wyman","layer":"Hive","in":[{"name":"ow_prod_data.source_processing","project":"Oliver_Wyman","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"ow_ow_prod_data_request_items","project":"Oliver_Wyman","layer":"Hive","in":[{"name":"ow_prod_data.request_items","project":"Oliver_Wyman","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"alfacre.trig_subsribe","project":"triggers","layer":"Oracle","in":[],"out":[],"datasetType":"Table"},{"name":"alfacre.trig","project":"triggers","layer":"Oracle","in":[],"out":[],"datasetType":"Table"},{"name":"credreg_trig_alfacre_trig_subscribe","project":"triggers","layer":"Hive","in":[{"name":"alfacre.trig_subsribe","project":"","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"credreg_trig_alfacre_triggers","project":"triggers","layer":"Hive","in":[{"name":"alfacre.trig","project":"","layer":"Oracle","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"credreg_trig_alfacre_trig_enriched","project":"triggers","layer":"Hive","in":[{"name":"credreg_trig_alfacre_triggers","project":"","layer":"Hive","in":[],"out":[],"datasetType":"Table"},{"name":"credreg_trig_alfacre_trig_subscribe","project":"","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"},{"name":"credreg_trig_alfacre_trig_enriched_final","project":"triggers","layer":"DataMart","in":[{"name":"credreg_trig_alfacre_trig_enriched","project":"","layer":"Hive","in":[],"out":[],"datasetType":"Table"}],"out":[],"datasetType":"Table"}]}
  
  constructor(private http: HttpClient) { }
  getTopology(): Observable<Topology> {
    if(environment.singleHtml == false) {
      return this.http.get<Topology>("/render")
    } else {
      return of(this.data)
    }    
  }
}
