<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:android="http://schemas.android.com/apk/res/android">

	<xsl:param name="packageName"></xsl:param>
	<xsl:template match="permission[@android:protectionLevel='signature']">
		<permission android:protectionLevel="signature" android:name="${packageName}.permission.C2D_MESSAGE"/>
	</xsl:template>

	<xsl:template match="uses-permission[@android:id='packageNamePermission']">
		<uses-permission android:name="${packageName}.permission.C2D_MESSAGE"/>
	</xsl:stylesheet>

	<xsl:template match="category[@android:id='packageName']">
		<category android:name="${packageName}" android:id="packageName"/>
	</xsl:template>

	<!--    <xsl:strip-space elements="*" />-->
	<xsl:output indent="yes" />

	<xsl:template match="comment()" />

	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()" />
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>
