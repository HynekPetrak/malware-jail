var wbemFlagReturnImmediately = 0x10;
var wbemFlagForwardOnly = 0x20;

var arrComputers = new Array(".");
for (i = 0; i < arrComputers.length; i++) {
    WScript.Echo();
    WScript.Echo("==========================================");
    WScript.Echo("Computer: " + arrComputers[i]);
    WScript.Echo("==========================================");

    var objWMIService = GetObject("winmgmts:\\\\" + arrComputers[i] + "\\root\\CIMV2");
    var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL",
        wbemFlagReturnImmediately | wbemFlagForwardOnly);

    var enumItems = new Enumerator(colItems);
    for (; !enumItems.atEnd(); enumItems.moveNext()) {
        var objItem = enumItems.item();

        WScript.Echo("BootDevice: " + objItem.BootDevice);
        WScript.Echo("BuildNumber: " + objItem.BuildNumber);
        WScript.Echo("BuildType: " + objItem.BuildType);
        WScript.Echo("Caption: " + objItem.Caption);
        WScript.Echo("CodeSet: " + objItem.CodeSet);
        WScript.Echo("CountryCode: " + objItem.CountryCode);
        WScript.Echo("CreationClassName: " + objItem.CreationClassName);
        WScript.Echo("CSCreationClassName: " + objItem.CSCreationClassName);
        WScript.Echo("CSDVersion: " + objItem.CSDVersion);
        WScript.Echo("CSName: " + objItem.CSName);
        WScript.Echo("CurrentTimeZone: " + objItem.CurrentTimeZone);
        WScript.Echo("DataExecutionPrevention_32BitApplications: " + objItem.DataExecutionPrevention_32BitApplications);
        WScript.Echo("DataExecutionPrevention_Available: " + objItem.DataExecutionPrevention_Available);
        WScript.Echo("DataExecutionPrevention_Drivers: " + objItem.DataExecutionPrevention_Drivers);
        WScript.Echo("DataExecutionPrevention_SupportPolicy: " + objItem.DataExecutionPrevention_SupportPolicy);
        WScript.Echo("Debug: " + objItem.Debug);
        WScript.Echo("Description: " + objItem.Description);
        WScript.Echo("Distributed: " + objItem.Distributed);
        WScript.Echo("EncryptionLevel: " + objItem.EncryptionLevel);
        WScript.Echo("ForegroundApplicationBoost: " + objItem.ForegroundApplicationBoost);
        WScript.Echo("FreePhysicalMemory: " + objItem.FreePhysicalMemory);
        WScript.Echo("FreeSpaceInPagingFiles: " + objItem.FreeSpaceInPagingFiles);
        WScript.Echo("FreeVirtualMemory: " + objItem.FreeVirtualMemory);
        WScript.Echo("InstallDate: " + WMIDateStringToDate(objItem.InstallDate));
        WScript.Echo("LargeSystemCache: " + objItem.LargeSystemCache);
        WScript.Echo("LastBootUpTime: " + WMIDateStringToDate(objItem.LastBootUpTime));
        WScript.Echo("LocalDateTime: " + WMIDateStringToDate(objItem.LocalDateTime));
        WScript.Echo("Locale: " + objItem.Locale);
        WScript.Echo("Manufacturer: " + objItem.Manufacturer);
        WScript.Echo("MaxNumberOfProcesses: " + objItem.MaxNumberOfProcesses);
        WScript.Echo("MaxProcessMemorySize: " + objItem.MaxProcessMemorySize);
        WScript.Echo("Name: " + objItem.Name);
        WScript.Echo("NumberOfLicensedUsers: " + objItem.NumberOfLicensedUsers);
        WScript.Echo("NumberOfProcesses: " + objItem.NumberOfProcesses);
        WScript.Echo("NumberOfUsers: " + objItem.NumberOfUsers);
        WScript.Echo("Organization: " + objItem.Organization);
        WScript.Echo("OSLanguage: " + objItem.OSLanguage);
        WScript.Echo("OSProductSuite: " + objItem.OSProductSuite);
        WScript.Echo("OSType: " + objItem.OSType);
        WScript.Echo("OtherTypeDescription: " + objItem.OtherTypeDescription);
        WScript.Echo("PlusProductID: " + objItem.PlusProductID);
        WScript.Echo("PlusVersionNumber: " + objItem.PlusVersionNumber);
        WScript.Echo("Primary: " + objItem.Primary);
        WScript.Echo("ProductType: " + objItem.ProductType);
        WScript.Echo("QuantumLength: " + objItem.QuantumLength);
        WScript.Echo("QuantumType: " + objItem.QuantumType);
        WScript.Echo("RegisteredUser: " + objItem.RegisteredUser);
        WScript.Echo("SerialNumber: " + objItem.SerialNumber);
        WScript.Echo("ServicePackMajorVersion: " + objItem.ServicePackMajorVersion);
        WScript.Echo("ServicePackMinorVersion: " + objItem.ServicePackMinorVersion);
        WScript.Echo("SizeStoredInPagingFiles: " + objItem.SizeStoredInPagingFiles);
        WScript.Echo("Status: " + objItem.Status);
        WScript.Echo("SuiteMask: " + objItem.SuiteMask);
        WScript.Echo("SystemDevice: " + objItem.SystemDevice);
        WScript.Echo("SystemDirectory: " + objItem.SystemDirectory);
        WScript.Echo("SystemDrive: " + objItem.SystemDrive);
        WScript.Echo("TotalSwapSpaceSize: " + objItem.TotalSwapSpaceSize);
        WScript.Echo("TotalVirtualMemorySize: " + objItem.TotalVirtualMemorySize);
        WScript.Echo("TotalVisibleMemorySize: " + objItem.TotalVisibleMemorySize);
        WScript.Echo("Version: " + objItem.Version);
        WScript.Echo("WindowsDirectory: " + objItem.WindowsDirectory);
    }
}

function WMIDateStringToDate(dtmDate)
{
    if (dtmDate == null)
    {
        return "null date";
    }
    var strDateTime;
    if (dtmDate.substr(4, 1) == 0)
    {
        strDateTime = dtmDate.substr(5, 1) + "/";
    }
    else
    {
        strDateTime = dtmDate.substr(4, 2) + "/";
    }
    if (dtmDate.substr(6, 1) == 0)
    {
        strDateTime = strDateTime + dtmDate.substr(7, 1) + "/";
    }
    else
    {
        strDateTime = strDateTime + dtmDate.substr(6, 2) + "/";
    }
    strDateTime = strDateTime + dtmDate.substr(0, 4) + " " +
        dtmDate.substr(8, 2) + ":" +
        dtmDate.substr(10, 2) + ":" +
        dtmDate.substr(12, 2);
    return(strDateTime);
}
