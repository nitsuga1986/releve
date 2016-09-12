//= require jquery-ui/datepicker
//= require jquery-ui/autocomplete
//= require angular/angular.min
//= require angular/angular-resource.min
//= require angular/angular-route.min
//= require angular/ng-table.min
//= require config
//= require filters/html_trusted
//= require services/resources
//= require controllers/UsrMisClasesCtrl
//= require controllers/UsrAgendaCtrl
//= require controllers/UsrProgramarCtrl
//= require controllers/ClaseIndexCtrl
//= require controllers/ClaseEditCtrl
//= require controllers/ClaseBulkCtrl
//= require controllers/ClaseShowCtrl
//= require controllers/AlumnoIndexCtrl
//= require controllers/AlumnoEditCtrl
//= require controllers/AlumnoShowCtrl
//= require controllers/ActividadIndexCtrl
//= require controllers/ActividadEditCtrl
//= require controllers/ActividadShowCtrl
//= require bootstrap-calendar/underscore-min
//= require bootstrap-calendar/calendar
//= require routes
// startLoading
function startLoading() {
	$('#AppContainer').fadeOut();
	$('#ReleveImgNav').hide();
	$('#LoadingImg').show();
}
// stopLoading
function stopLoading() {
	$('#LoadingImg').hide();
	$('#ReleveImgNav').show();
	$('#AppContainer').fadeIn();
}
startLoading();
